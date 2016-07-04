import fetch from 'isomorphic-fetch';
import store from 'store';
import { browserHistory } from 'react-router';
import Config from '../Config';

// region fetchMe

export const RECEIVE_ME = 'RECEIVE_ME';

export function receiveMe(body) {
    return {
        type: RECEIVE_ME,
        payload: {
            body
        }
    };
}

export function fetchMe() {
    return dispatch => {
        const config = {
            method: 'GET',
            headers: {
                token: store.get('me').token
            }
        };

        return fetch(`${Config.apiURL}/users/1`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status >= 400 && response.status <= 403) {
                    dispatch(browserHistory.push('/signin'));
                }
                throw new Error('Cannot get me');
            })
            .then(user => dispatch(receiveMe(user)));
    };
}

// endregion