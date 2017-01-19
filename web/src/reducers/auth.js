import {
    API_SIGNIN_SUCCESS,
    API_SIGNIN_ERROR,
    USER_CREATE_ERROR,
    USER_CREATED,
    CREATE_USER_LOADING,
    NOTIFY_PASSWORD_ERROR,
    NOTIFY_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_SUCCESS
} from '../actions/auth';

import store from 'store';

const initialState = {
    tryCount: 0,
    success: false,
    me: store.get('me') || {},
    createUser: {},
    notifyPassword: {},
    changePassword: {}
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case API_SIGNIN_SUCCESS:
            return Object.assign({}, state, {success: true, tryCount: state.tryCount + 1, user: action.payload.user});
        case API_SIGNIN_ERROR:
            return Object.assign({}, state, {success: false, tryCount: state.tryCount + 1, user: {}});
        case USER_CREATE_ERROR:
            return {...state, createUser: {error: true, success: false}};
        case USER_CREATED:
            return {...state, createUser: {error: false, success: true}};
        case CREATE_USER_LOADING:
            return {...state, createUser: {error: false, success: false}};
        case NOTIFY_PASSWORD_SUCCESS:
            return {...state, notifyPassword: {success: true, error: false}};
        case NOTIFY_PASSWORD_ERROR:
            return {...state, notifyPassword: {error: true, success: false}};
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, changePassword: {success: true, error: false}};
        case CHANGE_PASSWORD_ERROR:
            return {...state, changePassword: {error: true, success: false}};
        default:
            return state;
    }
}