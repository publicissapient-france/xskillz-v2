import { RECEIVE_SKILLS, SKILL_GOT } from '../actions/skills';

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
        default:
            return state;
    }
}