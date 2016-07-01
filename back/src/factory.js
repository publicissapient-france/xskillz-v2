'use strict';

const _ = require('lodash');
const gravatar = require('gravatar');

const Factory = {
//-- skills
    createSkill: (skill) => {
        return {
            domain: {
                id: skill.domain_id,
                name: skill.domain_name
            },
            id: skill.id,
            name: skill.name,
            numAllies: skill.num_allies
        };
    },

//-- updates
    createUserUpdates: (userUpdates) => {
        var user = userUpdates[0];
        return {
            user: {
                name: user.user_name,
                id: user.user_id,
                gravatarUrl: gravatar.url(user.user_email),
                experienceCounter: new Date().getFullYear() - new Date(user.user_diploma).getFullYear()
            },
            updates: userUpdates.map((userUpdate)=> {
                return {
                    id: userUpdate.user_skill_id,
                    skill: {
                        id: userUpdate.skill_id,
                        interested: userUpdate.skill_interested[0] === 1,
                        level: userUpdate.skill_level,
                        name: userUpdate.skill_name
                    },
                    date: userUpdate.skill_date
                }
            })
        };
    },

    createUpdates: (updates) => {
        const response = [];
        _(updates)
            .groupBy((update)=>update.user_id)
            .values()
            .value()
            .forEach((userUpdates) => {
                response.push(Factory.createUserUpdates(userUpdates));
            });
        return response;
    },

//-- users
    createUser: (raw)=> {
        return {
            name: raw.name,
            id: raw.id,
            gravatarUrl: gravatar.url(raw.email),
            experienceCounter: new Date().getFullYear() - new Date(raw.diploma).getFullYear()
        };
    },

    computeScore: (skills) => {
        return _(skills)
            .map((skill)=>skill.level)
            .reduce((sum, n) => sum + n, 0);
    },

    createDomain: (domainSkills) => {
        var domain = domainSkills[0];
        return {
            id: domain.domain_id,
            name: domain.domain_name,
            score: Factory.computeScore(domainSkills),
            skills: _(domainSkills)
                .map((skill)=> {
                    return {
                        id: skill.skill_id,
                        interested: skill.interested,
                        level: skill.level,
                        name: skill.skill_name
                    }
                })
                .value()
        };
    }
};

module.exports = Factory;