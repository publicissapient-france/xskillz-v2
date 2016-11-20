import fetch from 'isomorphic-fetch';
import store from 'store';

import Config from '../Config';

import {browserHistory} from 'react-router';

export const API_SIGNIN_SUCCESS = 'API_SIGNIN_SUCCESS';
export const API_SIGNIN_ERROR = 'API_SIGNIN_ERROR';

export function getToken() {
    const me = store.get('me') || {};
    return me.token;
}

export function logout() {
    store.clear();
}

export function signinSuccess(user) {
    store.set('me', user);

    return {
        type: API_SIGNIN_SUCCESS,
        payload: {user}
    }
}

export function signinError() {
    return {
        type: API_SIGNIN_ERROR
    }
}

export function signin(email, password) {
    return dispatch => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        };
        return fetch(`${Config.apiURL}/signin`, config)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Signin error");
                } else {
                    return response.json();
                }
            })
            .then(json => {
                dispatch(signinSuccess(json));
                browserHistory.push('/me');
            })
            .catch(() => dispatch(signinError()));
    }
}

export const USER_CREATED = 'USER_CREATED';

export function userCreated() {
    return {
        type: USER_CREATED
    }
}

export const USER_CREATE_ERROR = 'USER_CREATE_ERROR';

export function userCreateError() {
    return {
        type: USER_CREATE_ERROR
    }
}

export const CREATE_USER_LOADING = 'CREATE_USER_LOADING';

export function createUserLoading() {
    return {
        type: CREATE_USER_LOADING
    }
}

export function createUser(name, email, password) {
    return dispatch => {

        dispatch(createUserLoading());

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        };

        return fetch(`${Config.apiURL}/users`, config)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Signin error");
                } else {
                    return response.json();
                }
            })
            .then(() => dispatch(userCreated()))
            .catch(() => dispatch(userCreateError()));
    }
}

export function signup(name, email, password) {
    return dispatch => {

        dispatch(createUserLoading());

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        };

        return fetch(`${Config.apiURL}/users`, config)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Signin error");
                } else {
                    return response.json();
                }
            })
            .then(user => {
                dispatch(signinSuccess(user));
                browserHistory.push('/me');
            })
            .catch(() => dispatch(userCreateError()));
    }
}