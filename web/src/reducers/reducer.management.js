import {RECEIVE_MANAGEMENT} from "../actions/management";

const initialState = {
    management: [],
    loaded: false
};

export function management(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_MANAGEMENT:
            return Object.assign({}, state, {
                management: action.payload.management.management,
                loaded: true
            });
        default:
            return state;
    }
}