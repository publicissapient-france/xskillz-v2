import fetch from "isomorphic-fetch";
import {browserHistory} from "react-router";
import {getToken} from "./auth";
import Config from "../Config";

export const REQUEST_MANAGEMENT = 'REQUEST_MANAGEMENT';
export const RECEIVE_MANAGEMENT = 'RECEIVE_MANAGEMENT';

export function requestManagement() {
    return {
        type: REQUEST_MANAGEMENT
    }
}

export function fetchManagement() {
    return (dispatch) => {
        dispatch(requestManagement());
        const config = {
            method: 'GET',
            headers: {
                token: getToken()
            }
        };
        return fetch(`${Config.apiURL}/management`, config)
            .then((response) => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(receiveManagement(json)));
    }
}

export function receiveManagement(management) {
    return {
        type: RECEIVE_MANAGEMENT,
        payload: {
            management
        }
    }
}