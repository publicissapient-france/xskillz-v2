import { RECEIVE_SKILLS, SKILL_GOT, SKILL_ADDED, SKILLS_MERGED, SKILL_DEFINITION_UPDATED } from '../actions/skills';

const initialState = {
    list: [],
    loaded: false,
    newSkill: {}
};

export function skills(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_SKILLS:
            return Object.assign({}, state, {
                list: action.payload.skills,
                loaded: true
            });
        case SKILL_GOT:
            return Object.assign({}, state, {
                skill: action.payload.skill.skill
            });
        case SKILL_ADDED:
            return Object.assign({}, state, {loaded: false});
        case SKILLS_MERGED:
            return Object.assign({}, state, {
                skillsMerged: true});
        case SKILL_DEFINITION_UPDATED:
            return Object.assign({}, state, {
                skillDefinitionUpdated: true});
        default:
            return state;
    }
}