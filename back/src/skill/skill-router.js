'use strict';

const SkillController = require('./skill-controller');

const SkillRouter = {

    register: (express) => {
        express.get('/skills', SkillController.getSkills)
            .put('/skills', SkillController.merge)
            .post('/me/skills', SkillController.addSkill)
            .delete('/me/skills/:id', SkillController.deleteUserSkillById)
            .put('/me/skills/:id', SkillController.updateUserSkillById)
            .post('/domains/:id/skills', SkillController.addSkillToDomain)
    }
};

module.exports = SkillRouter;
