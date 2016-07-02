import { RECEIVE_ME } from '../actions/action.me';

const initialState = {
    loaded: false
};

export function me(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_ME:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}