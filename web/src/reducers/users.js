import { RECEIVE_USERS, RECEIVE_USER_BY_ID, REQUEST_USERS, REQUEST_USER_BY_ID, RECEIVE_USERS_BY_SKILL  } from '../actions/users';

const initialState = {
    list: [],
    user: {},
    bySkill: {
        skillId: undefined,
        list: [],
        loaded: false
    },
    loaded: false
};

export function users(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USERS:
        case REQUEST_USER_BY_ID:
            return Object.assign({}, state, {
                loaded: false
            });
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                list: action.payload.users,
                loaded: true
            });
        case RECEIVE_USERS_BY_SKILL:
            return Object.assign({}, state, {
                bySkill: {
                    skillId: action.payload.skillId,
                    list: action.payload.users,
                    loaded: true
                }
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