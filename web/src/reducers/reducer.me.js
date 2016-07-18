import {RECEIVE_ME} from '../actions/action.me';
import {SKILL_REMOVED} from '../actions/skills';
import _ from 'lodash';

const initialState = {
    loaded: false
};

export function me(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_ME:
        {
            const next = {...state, ...action.payload};
            next.loaded = true;
            return next;
        }
        case SKILL_REMOVED:
        {
            const next = {...state};
            _.each(next.domains, domain => _.remove(domain.skills, skill => skill.id === action.payload.id));
            return next;
        }
        default:
            return state;
    }
}