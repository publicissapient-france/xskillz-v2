import fetch from 'isomorphic-fetch';
import store from 'store';
import { routeActions } from 'react-router-redux';

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
                Accept: 'application/json',
                token: store.get('token')
            }
        };

        return fetch(`http://52.29.198.81:8080/users/228`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status >= 400 && response.status <= 403) {
                    dispatch(routeActions.push('/signin'));
                }
                throw new Error('Cannot get me');
            })
            .then(user => dispatch(receiveMe(user)));
    };
}

// endregion