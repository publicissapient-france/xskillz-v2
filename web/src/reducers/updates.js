import { RECEIVE_UPDATES } from '../actions/updates';

const initialState = {
    list: [],
    loaded: false
};

export function updates(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_UPDATES:
            return Object.assign({}, state, {
                list: action.payload.updates,
                loaded: true
            });
        default:
            return state;
    }
}