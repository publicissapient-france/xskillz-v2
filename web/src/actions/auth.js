import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import store from 'store';
import { routeActions } from 'react-router-redux';
import Config from '../Config';

export const API_SIGNIN_SUCCESS = 'API_SIGNIN_SUCCESS';
export const API_SIGNIN_ERROR = 'API_SIGNIN_ERROR';

export function signinSuccess(user) {

    store.set('token', user.token);

    return {
        type: API_SIGNIN_SUCCESS
    }
}

export function signinError() {

    store.remove('token');

    return {
        type: API_SIGNIN_ERROR
    }
}

export function signin(email, password) {
    return (dispatch) => {

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        };

        return fetch(`${Config.apiURL}/signin`, config)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Signin error");
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                dispatch(signinSuccess(json));
                dispatch(routeActions.push('/updates'));
            })
            .catch(() => dispatch(signinError()));
    }
}