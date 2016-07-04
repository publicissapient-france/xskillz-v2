import { API_SIGNIN_SUCCESS, API_SIGNIN_ERROR } from '../actions/auth';
import store from 'store';

const initialState = {
    tryCount: 0,
    success: false,
    me: store.get('me') || {}
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case API_SIGNIN_SUCCESS:
            return Object.assign({}, state, {success: true, tryCount: state.tryCount + 1, user: action.payload.user});
        case API_SIGNIN_ERROR:
            return Object.assign({}, state, {success: false, tryCount: state.tryCount + 1, user: {}});
        default:
            return state;
    }
}