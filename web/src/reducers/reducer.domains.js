import {
    DOMAINS_GOT, RECEIVE_DOMAINS, SKILL_LINKED_TO_DOMAIN, DOMAIN_ADDED,
    DOMAIN_REMOVED
} from '../actions/action.domains';

const initialState = {
    list: [],
    loaded: false,
};

export function domains(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_DOMAINS:
            return Object.assign({}, state, {
                list: action.payload.domains.domains,
                loaded: true
            });
        case DOMAINS_GOT:
            return Object.assign({}, state, {
                list: action.payload.domains,
                loaded: true
            });
        case SKILL_LINKED_TO_DOMAIN:
            return Object.assign({}, state, {
                skillLinked: true
            });
        case DOMAIN_ADDED:
            return Object.assign({}, state, {
                domainAdded: true
            });
        case DOMAIN_REMOVED:
            return Object.assign({}, state, {
                domainRemoved: true
            });
        default:
            return state;
    }
}