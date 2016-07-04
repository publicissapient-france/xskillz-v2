import { DOMAINS_GOT } from '../actions/action.domains';

const initialState = {
    list: [],
    loaded: false
};

export function domains(state = initialState, action) {
    switch (action.type) {
        case DOMAINS_GOT:
            return Object.assign({}, state, {
                list: action.payload.domains,
                loaded: true
            });
        default:
            return state;
    }
}