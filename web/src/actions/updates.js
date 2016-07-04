import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import store from 'store';
import Config from '../Config';

export const REQUEST_UPDATES_BY_COMPANY = 'REQUEST_UPDATES_BY_COMPANY';
export const RECEIVE_UPDATES = 'RECEIVE_UPDATES';

export function requestUpdates(companyId) {
    return {
        type: REQUEST_UPDATES_BY_COMPANY,
        payload: {
            companyId: companyId
        }
    }
}

export function fetchUpdates() {
    return (dispatch) => {

        dispatch(requestUpdates());

        const config = {
            method: 'GET',
            headers: {
                token: store.get('me').token
            }
        };

        return fetch(`${Config.apiURL}/updates`, config)
            .then((response) => {
                if (response.status >= 400 && response.status <= 403) {
                    dispatch(browserHistory.push('/signin'));
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(receiveUpdates(json)));
    }
}

export function receiveUpdates(updates) {
    return {
        type: RECEIVE_UPDATES,
        payload: {
            updates: updates
        }
    }
}