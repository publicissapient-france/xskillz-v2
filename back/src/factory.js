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
        return {
            user: {
                companyName: userUpdates[0].company_name,
                name: userUpdates[0].user_name,
                id: userUpdates[0].user_id,
                gravatarUrl: gravatar.url(userUpdates[0].user_email),
                experienceCounter: new Date().getFullYear() - new Date(userUpdates[0].user_diploma).getFullYear()
            },
            updates: userUpdates.map((userUpdate)=> {
                return {
                    id: userUpdate.user_skill_id,
                    skill: {
                        id: userUpdate.skill_name,
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
            companyName: raw.company_name,
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
        return {
            id: domainSkills[0].domain_id,
            name: domainSkills[0].domain_name,
            score: Factory.computeScore(domainSkills),
            skills: _(domainSkills)
                .map((skill)=> {
                    return {
                        id: skill.skill_id,
                        interested: skill.interested[0] === 1,
                        level: skill.level,
                        name: skill.skill_name
                    }
                })
                .value()
        };
    }
    
};

module.exports = Factory;