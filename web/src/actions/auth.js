import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import store from 'store';
import Config from '../Config';
import { browserHistory } from 'react-router';

export const API_SIGNIN_SUCCESS = 'API_SIGNIN_SUCCESS';
export const API_SIGNIN_ERROR = 'API_SIGNIN_ERROR';

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
                browserHistory.push('/updates');
            })
            .catch(() => dispatch(signinError()));
    }
}