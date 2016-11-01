import { DOMAINS_GOT, RECEIVE_DOMAINS } from '../actions/action.domains';

const initialState = {
    list: [],
    loaded: false
};

export function domains(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_DOMAINS:
            return Object.assign({}, state, {
                domains: action.payload.domains.domains,
                loaded: true
            });
        case DOMAINS_GOT:
            return Object.assign({}, state, {
                list: action.payload.domains,
                loaded: true
            });
        default:
            return state;
    }
}