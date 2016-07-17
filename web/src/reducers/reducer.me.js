import { RECEIVE_ME } from '../actions/action.me';

const initialState = {
    loaded: false
};

export function me(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_ME:
            const next = {...state, ...action.payload};
            next.loaded = true;
            return next;
        default:
            return state;
    }
}