const sinon = require('sinon');

const SkillService = require('../../../src/skill/skill-service');
const SkillRepository = require('../../../src/skill/skill-repository');

describe('SkillService', () => {

    describe('Skills', () => {
        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => sandbox.restore());

        it('should add new skill', done => {
            const userId = 123;
            const skillRequest = {name: 'Java'};

            const addSkill = sandbox.stub(SkillRepository, 'addSkill');

            sandbox
                .stub(SkillRepository, 'findSkillByExactName')
                .returns(Promise.resolve(
                    {
                        id: 1
                    }));

            sandbox
                .stub(SkillRepository, 'findUserSkillByUserIdAndSkillId')
                .returns(Promise.resolve([]));

            SkillService
                .addSkill(userId, skillRequest)
                .then(() => {
                    sinon.assert.calledWith(addSkill,
                        {
                            id: 1,
                            name: 'Java'
                        });

                })
                .then(done)
                .catch(done);
        });

        it('should use existing skill', done => {
            const userId = 123;
            const skillRequest = {name: 'Java'};

            const updateUserSkillById = sandbox.stub(SkillRepository, 'updateUserSkillById');

            sandbox
                .stub(SkillRepository, 'findSkillByExactName')
                .returns(Promise.resolve(
                    {
                        id: 1
                    }));

            sandbox
                .stub(SkillRepository, 'findUserSkillByUserIdAndSkillId')
                .returns(Promise.resolve([{}]));

            SkillService
                .addSkill(userId, skillRequest)
                .then(() => {
                    sinon.assert.calledWith(updateUserSkillById, 1,
                        {
                            id: 1,
                            name: 'Java'
                        });

                })
                .then(done)
                .catch(done);
        });

        it('should delete user skill by id', done => {
            const userId = 123;
            const skillId = 456;

            const deleteUserSkillById =
                sandbox.stub(SkillRepository, 'deleteUserSkillById')
                    .returns(Promise.resolve({}));

            SkillService
                .deleteUserSkillById(skillId, userId)
                .then(() => {
                    sinon.assert.calledWith(deleteUserSkillById, skillId, userId);
                })
                .then(done)
                .catch(done);
        });

        it('should update user skill by id', done => {
            const skill = {id: 456};
            const skillId = 234;

            const updateUserSkillById =
                sandbox.stub(SkillRepository, 'updateUserSkillById')
                    .returns(Promise.resolve({}));

            SkillService
                .updateUserSkillById(skillId, skill)
                .then(() => {
                    sinon.assert.calledWith(updateUserSkillById, skillId, skill);
                })
                .then(done)
                .catch(done);
        });

        it('should remove domain from skills', done => {
            const removeDomainFromSkills =
                sandbox.stub(SkillRepository, 'removeDomainFromSkills')
                    .returns(Promise.resolve());

            SkillService
                .removeDomainFromSkills(5)
                .then(() => {
                    sinon.assert.calledWith(removeDomainFromSkills, 5);
                })
                .then(done)
                .catch(done);
        });

    });
});