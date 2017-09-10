import { RECEIVE_USER_BY_ID, REQUEST_USER_BY_ID } from '../actions/users';

const initialState = {
    user: {},
    loaded: false
};

export function user(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER_BY_ID:
            return Object.assign({}, state, {
                loaded: false
            });
        case RECEIVE_USER_BY_ID:
            return Object.assign({}, state, {
                user: action.payload.user,
                loaded: true
            });
        default:
            return state;
    }
}