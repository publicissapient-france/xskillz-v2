'use strict';

const Repository = require('./user-repository');
const _ = require('lodash');
const gravatar = require('gravatar');
const uuid = require('uuid');

const SkillService = require('../skill/skill-service');

const computeScore = skills =>
    _(skills)
        .map((skill)=>skill.level)
        .reduce((sum, n) => sum + n, 0);

const createUser = raw =>
    ({
        name: raw.name,
        id: raw.id,
        gravatarUrl: gravatar.url(raw.email),
        experienceCounter: raw.diploma ? new Date().getFullYear() - new Date(raw.diploma).getFullYear() : 0,
        phone: raw.phone,
        manager_id: raw.manager_id,
        readable_id: raw.name.toLowerCase().replace(' ', '-')
    });

const createDomain = domainSkills => {
    var domain = domainSkills[0];
    return {
        id: domain.domain_id,
        name: domain.domain_name,
        score: computeScore(domainSkills),
        color: domain.domain_color || 'pink',
        skills: _(domainSkills)
            .map((skill)=> {
                return {
                    id: skill.skill_id,
                    interested: skill.interested,
                    level: skill.level,
                    name: skill.skill_name
                };
            })
            .value()
    };
};

const createUserUpdates = (userUpdates) => {
    var user = userUpdates[0];
    return {
        user: {
            name: user.user_name,
            id: user.user_id,
            gravatarUrl: gravatar.url(user.user_email),
            experienceCounter: user.user_diploma ? new Date().getFullYear() - new Date(user.user_diploma).getFullYear() : 0,
            readable_id: user.user_name.toLowerCase().replace(' ', '-')
        },
        updates: userUpdates.map((userUpdate)=> {
            return {
                id: userUpdate.user_skill_id,
                skill: {
                    id: userUpdate.skill_id,
                    interested: userUpdate.skill_interested[0] === 1,
                    level: userUpdate.skill_level,
                    name: userUpdate.skill_name,
                    color: userUpdate.color,
                    domain: userUpdate.domain_name
                },
                date: userUpdate.skill_date
            };
        })
    };
};

const createUpdates = (updates) => {
    const response = [];
    _(updates)
        .groupBy((update)=>update.user_id)
        .values()
        .value()
        .forEach((userUpdates) => {
            response.push(createUserUpdates(userUpdates));
        });
    return response;
};

const populateUser = user => {
    user = createUser(user);
    user.domains = [];
    return attachManager(user)
        .then((dbUser) => {
            user = _.assignWith(user, dbUser);
            return SkillService.findUserSkillsById(user.id);
        })
        .then((skills) => {
            user.score = computeScore(skills);
            _(skills)
                .groupBy('domain_id')
                .values()
                .value()
                .forEach((domainSkills) => user.domains.push(createDomain(domainSkills)));
        })
        .then(() => user.domains.sort((d1, d2) => d2.score - d1.score))
        .then(() => Repository.findUserRolesById(user.id))
        .then((roles) => {
            user.roles = roles.map((r)=>r.name);
        })
        .then(() => user);
};

const createUserById = (id) =>
    Repository
        .findUserById(id)
        .then(populateUser);

const createUserByReadableId = (id) =>
    Repository
        .findUserByReadableId(id)
        .then(populateUser);

const toSimpleUserObject = (user) => ({id: user.user_id, name: user.user_name});

const groupUsersByManager = users => {
    const managersById = _(users).keyBy('manager_id').value();
    const usersByManagers = _(managersById)
        .keys()
        .map(manager_id => {
            const manager = {
                manager: {name: managersById[manager_id].manager_name, id: managersById[manager_id].manager_id},
                users: _(users)
                    .filter((user) => user.manager_id == manager_id)
                    .map(toSimpleUserObject)
                    .value()
            };
            if (manager_id === 'null') {
                manager.users = _(users)
                    .filter((user) => !user.manager_id)
                    .map(toSimpleUserObject)
                    .value();
            }
            return manager;
        })
        .sortBy(manager => manager.manager.name)
        .value();
    return Promise.resolve(usersByManagers);
};

const attachManager = user => {
    if (!user.manager_id) {
        return Promise.resolve(user);
    }
    return Repository
        .findUserById(user.manager_id)
        .then((manager) => {
            delete manager.password;
            user.manager = manager;
            return user;
        });
};

module.exports = {
    getManagement: () =>
        Repository
            .getManagement()
            .then(groupUsersByManager),

    promoteToManager: (userId) =>
        Repository
            .findUserById(userId)
            .then((user) => Repository.addRole(user, 'Manager')),

    addUser: (user) =>
        Repository.addNewUser(user)
            .then(() => Repository.findUserByEmail(user.email))
            .then((dbUser) =>
                Repository.getUsersWithRoles('Manager')
                    .then((users) => {
                        if (users.length === 0) {
                            return Repository.addRole(dbUser, 'Manager').then(() => dbUser);
                        }
                        return dbUser;
                    }))
            .then(() => Repository.findUserByEmail(user.email))
            .then((user) => {
                const token = uuid.v4();
                return Repository.addToken(user, token)
                    .then(() => {
                        user.token = token;
                        return user;
                    });
            }),

    getUsersBySkillMobileVersion: (skillId) =>
        Repository
            .findUsersBySkill(skillId)
            .map((user)=> createUserById(user.id)),

    getUsersBySkill: (skillId) =>
        Repository
            .findUsersBySkill(skillId)
            .map((user)=> {
                const _user = createUser(user);
                _user.level = user.level;
                _user.interested = (user.interested[0] === 1);
                return _user;
            }),

    getUsersWebVersion: (query) => {
        let usersPromise;
        if (query.with_roles) {
            usersPromise = Repository.getWebUsersWithRoles(query.with_roles);
        } else {
            usersPromise = Repository.getWebUsers();
        }
        return usersPromise
            .then((rows) => {
                return _(rows)
                    .groupBy('user_id')
                    .map((domainRows) => {
                        var user = domainRows[0];
                        return {
                            id: user.user_id,
                            name: user.user_name,
                            gravatarUrl: gravatar.url(user.email),
                            experienceCounter: user.diploma ? new Date().getFullYear() - new Date(user.diploma).getFullYear() : 0,
                            domains: domainRows.map((domainRow) =>
                                ({
                                    id: domainRow.domain_id,
                                    name: domainRow.domain_name,
                                    score: domainRow.domain_score,
                                    color: domainRow.domain_color
                                })
                            ),
                            score: _.reduce(domainRows, (sum, n) => sum + n.domain_score, 0),
                            readable_id: user.user_name.toLowerCase().replace(' ', '-')
                        };
                    })
                    .sortBy('name');
            });
    },

    getUsersMobileVersion: (query) => {
        let usersPromise;
        if (query.with_roles) {
            usersPromise = Repository.getUsersWithRoles(query.with_roles);
        } else {
            usersPromise = Repository.getUsers();
        }
        return usersPromise
            .map((user)=> createUserById(user.id));
    },

    getUsers: (query) => {
        let usersPromise;
        if (query.with_roles) {
            usersPromise = Repository.getUsersWithRoles(query.with_roles);
        } else {
            usersPromise = Repository.getUsers();
        }
        return usersPromise.map((user)=> createUser(user));
    },

    deleteUserById: (userId) =>
        Repository
            .deleteUserById(userId),

    signIn: (user) => {
        const email = user.email;
        const password = user.password;
        return Repository
            .findUserByEmailAndPassword(email, password)
            .then((user) => {
                if (!user) {
                    throw new Error(`User ${email} not found`);
                }
                return user;
            })
            .then((user) => {
                const token = uuid.v4();
                return Repository.addToken(user, token)
                    .then(() => {
                        user.token = token;
                        return user;
                    });
            })
            .then((user) =>
                Repository.findUserRolesById(user.id)
                    .then((roles) => {
                        user.roles = roles;
                        return user;
                    })
            );
    },

    assignManager: (userId, managerId) =>
        Repository
            .assignManager(userId, managerId),

    updateUser: (userId, body) =>
        Repository
            .updateUser(userId, body),

    getUpdates: () =>
        Repository
            .getUpdates()
            .then((updates) => createUpdates(updates)),

    updatePassword: (userId, oldPassword, newPassword) =>
        Repository
            .updatePassword(userId, oldPassword, newPassword),

    updatePhone: (userId, phone) =>
        Repository
            .updatePhone(userId, phone),

    getUserByToken: (token) =>
        Repository.getUserByToken(token),

    getUserById: (userId) =>
        Repository
            .findUserById(userId)
            .then((user) => createUserById(user.id)),

    createUserById,
    createUserByReadableId,
    attachManager
};