import {RECEIVE_ME, CHANGE_PASSWORD_ERROR, PASSWORD_CHANGED, CHANGE_PASSWORD_LOADING} from '../actions/action.me';
import {SKILL_REMOVED, SKILL_ADDED, SKILL_UPDATED} from '../actions/skills';
import _ from 'lodash';

const initialState = {
    loaded: false,
    changePassword: {}
};

export function me(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_ME: {
            const next = {...state, ...action.payload};
            next.loaded = true;
            return next;
        }
        case SKILL_REMOVED: {
            const next = {...state};
            _.each(next.domains, domain => _.remove(domain.skills, skill => skill.id === action.payload.id));
            return next;
        }
        case SKILL_ADDED: {
            const next = {...state};
            const skill = action.payload.skill;
            let added = false;
            _.each(next.domains, domain => {
                if (domain.id === skill.domain.id) {
                    const sIndex = _.findIndex(domain.skills, s => s.id === skill.id);
                    if (sIndex >= 0) {
                        domain.skills[sIndex] = skill;
                    } else {
                        domain.skills.push(skill);
                    }
                    added = true;
                }
            });
            if (!added) {
                //noinspection JSUnresolvedFunction
                const cloneDomain = _.cloneDeep(skill.domain);
                cloneDomain.skills = [skill];
                next.domains.push(cloneDomain);
            }
            return next;
        }
        case SKILL_UPDATED: {
            const next = {...state};
            const skill = action.payload.skill;
            _.each(next.domains, domain => {
                const index = _.findIndex(domain.skills, s => s.id === skill.id);
                if (index >= 0) {
                    domain.skills[index] = {...skill};
                }
            });
            return next;
        }
        case CHANGE_PASSWORD_ERROR:
            return {...state, changePassword: {error: true, success: false}};
        case PASSWORD_CHANGED:
            return {...state, changePassword: {error: false, success: true}};
        case CHANGE_PASSWORD_LOADING:
            return {...state, changePassword: {error: false, success: false}};
        default:
            return state;
    }
}