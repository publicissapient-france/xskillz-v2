import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import store from 'store';
import Config from '../Config';

export const REQUEST_USER_BY_ID = 'REQUEST_USER_BY_ID';
export const RECEIVE_USER_BY_ID = 'RECEIVE_USER_BY_ID';

export function requestUserById(userId) {
    return {
        type: REQUEST_USER_BY_ID,
        payload: {
            userId: userId
        }
    }
}

export function receiveUserById(user) {
    return {
        type: RECEIVE_USER_BY_ID,
        payload: {
            user: user
        }
    }
}

export function getUserById(userId) {
    return dispatch => {
        dispatch(requestUserById(userId));

        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': store.get('token')
            }
        };

        return fetch(`${Config.apiURL}/users/${userId}`, config)
            .then((response) => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(receiveUserById(json)));
    };
}