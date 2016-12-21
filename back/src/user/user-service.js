'use strict';

const Repository = require('./user-repository');
const _ = require('lodash');
const uuid = require('uuid');
const User = require('./user');

const SkillService = require('../skill/skill-service');

const computeScore = skills =>
    _(skills)
        .map((skill) => skill.level)
        .reduce((sum, n) => sum + n, 0);

const createDomain = domainSkills => {
    var domain = domainSkills[0];
    return {
        id: domain.domain_id,
        name: domain.domain_name,
        score: computeScore(domainSkills),
        color: domain.domain_color || 'pink',
        skills: _(domainSkills)
            .map((skill) => {
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

const populateUser = user => {
    user = new User(user);
    user.domains = [];
    const findUserRolesById = Repository.findUserRolesById;
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
        .then(() => findUserRolesById(user.id))
        .then(roles => {
            user.roles = roles.map(r => r.name);
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
        .then(populateUser)
        .then(user => user.expurge());

const createUserByLogin = (login) =>
    Repository
        .findUserByLogin(login)
        .then(user => {
            if (user) {
                return populateUser(user);
            }
            return user;
        });

const toSimpleUserObject = (user) => ({id: user.user_id, name: user.user_name, readable_id: User.toReadableId(user.user_name)});

const groupUsersByManager = users => {
    const managersById = _(users).keyBy('manager_id').value();
    const usersByManagers = _(managersById)
        .keys()
        .map(manager_id => {
            const manager = {
                manager: {name: managersById[manager_id].manager_name, id: managersById[manager_id].manager_id, readable_id: User.toReadableId(managersById[manager_id].manager_name)},
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
        .then(manager => {
            user.manager = new User(manager).expurge();
            return user;
        });
};

module.exports = {
    findUserRolesById: userId => Repository.findUserRolesById(userId),

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
            .map((user) => createUserById(user.id).then(user => user.expurge())),

    getUsersBySkill: (skillId) =>
        Repository
            .findUsersBySkill(skillId)
            .map((user) => {
                const _user = new User(user).expurge();
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
                        return new User({
                            id: user.user_id,
                            name: user.user_name,
                            email: user.email,
                            diploma: user.diploma,
                            domains: domainRows.map((domainRow) =>
                                ({
                                    id: domainRow.domain_id,
                                    name: domainRow.domain_name,
                                    score: domainRow.domain_score,
                                    color: domainRow.domain_color
                                })
                            ),
                            score: _.reduce(domainRows, (sum, n) => sum + n.domain_score, 0)
                        }).expurge();
                    })
                    .sortBy('name').value();
            });
    },

    getUsersMobileVersion: (query) => {
        let usersPromise;
        if (query.with_roles) {
            usersPromise = Repository.getUsersWithRoles(query.with_roles);
        } else {
            usersPromise = Repository.getUsers();
        }
        return usersPromise.map(user => createUserById(user.id).then(user => user.expurge()));
    },

    getUsers: (query) => {
        let usersPromise;
        if (query.with_roles) {
            usersPromise = Repository.getUsersWithRoles(query.with_roles);
        } else {
            usersPromise = Repository.getUsers();
        }
        return usersPromise.map(user => {
            return new User(user).expurge();
        });
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
                        user.roles = _.map(roles, role => role.name.toLowerCase());
                        return user;
                    })
            );
    },

    assignManager: (userId, managerId) => Repository.assignManager(userId, managerId),

    updateUser: (userId, body) => {
        let updateFunction;
        if (body.diploma) {
            updateFunction = Repository.updateUserDiploma;
        }
        if (body.employee_date) {
            updateFunction = Repository.updateUserEmployeeDate;
        }
        if (body.employee_end_date) {
            updateFunction = Repository.updateUserEmployeeEndDate;
        }
        if (body.availability_date) {
            updateFunction = Repository.updateUserAvailabilityDate;
        }
        if (!updateFunction) {
            throw new Error('Invalid parameters');
        }
        return updateFunction(userId, body);
    },

    updatePassword: (userId, oldPassword, newPassword) => Repository.updatePassword(userId, oldPassword, newPassword),

    updatePhone: (userId, phone) => Repository.updatePhone(userId, phone),

    updateAddress: (userId, address) => Repository.updateAddress(userId, address),

    updateAvailability: (userId, availability) =>
        Repository.updateUserAvailabilityDate(userId, {availability_date: availability}),

    getUserByToken: (token) =>
        Repository.getUserByToken(token),

    getUserById: (userId) =>
        Repository
            .findUserById(userId)
            .then((user) => createUserById(user.id)),

    createUserById,
    createUserByReadableId,
    createUserByLogin,
    attachManager,

    findMatchingUsers: value =>
        Repository.findMatchingUsers(value)
};