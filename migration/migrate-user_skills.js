'use strict';

require('require-json');

const toSql = (result) => {
    var email = result.row[0];
    var skillName = result.row[1];
    var level = result.row[2];
    var interested = result.row[3];
    console.log(`INSERT INTO UserSkill (interested, level, skill_id, user_id) VALUES (${interested}, ${level}, (SELECT MAX(id) FROM Skill WHERE name = '${skillName}'), (SELECT MAX(id) FROM User WHERE email = '${email}'));`);
};

require('./user_skills_1.json').table._response.data.forEach(toSql);
require('./user_skills_2.json').table._response.data.forEach(toSql);
require('./user_skills_3.json').table._response.data.forEach(toSql);
require('./user_skills_4.json').table._response.data.forEach(toSql);