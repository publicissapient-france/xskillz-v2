import fetch from "isomorphic-fetch";
import {browserHistory} from "react-router";
import Config from "../Config";
import {getToken} from './auth';

// region fetch me

export const RECEIVE_ME = 'RECEIVE_ME';

export function receiveMe(body) {
    return {
        type: RECEIVE_ME,
        payload: {
            ...body
        }
    };
}

export function fetchMe() {
    return dispatch => {
        const config = {
            method: 'POST',
            headers: {
                token: getToken(),
                'Content-Type': 'application/json'
            }
        };
        return fetch(`${Config.apiURL}/me`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                }
                throw new Error('Cannot get me');
            })
            .then(user => dispatch(receiveMe(user)));
    };
}

// endregion

// region change password

export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';

export function passwordChanged() {
    return {
        type: PASSWORD_CHANGED
    }
}

export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

export function changePasswordError() {
    return {
        type: CHANGE_PASSWORD_ERROR
    }
}

export const CHANGE_PASSWORD_LOADING = 'CHANGE_PASSWORD_LOADING';

export function changePasswordLoading() {
    return {
        type: CHANGE_PASSWORD_LOADING
    }
}

export function changePassword(old_password, password) {
    return dispatch => {
        dispatch(changePasswordLoading());
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                token: getToken()
            },
            body: JSON.stringify({old_password, password})
        };
        return fetch(`${Config.apiURL}/me`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                }
                throw new Error('Cannot patch me');
            })
            .then(() => dispatch(passwordChanged()))
            .catch(() => dispatch(changePasswordError()))
    };
}

export const UPDATE_PROFILE_LOADING = 'UPDATE_PROFILE_LOADING';

function updateProfileLoading() {
    return {
        type: UPDATE_PROFILE_LOADING
    }
}

export const PROFILE_UPDATED = 'PROFILE_UPDATED';

function profileUpdated() {
    return {
        type: PROFILE_UPDATED
    }
}

export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';

function updateProfileError() {
    return {
        type: UPDATE_PROFILE_ERROR
    }
}

export function updateProfile(profile) {
    return dispatch => {
        dispatch(updateProfileLoading());
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                token: getToken()
            },
            body: JSON.stringify(profile)
        };
        return fetch(`${Config.apiURL}/me`, config)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status >= 400 && res.status <= 403) {
                    browserHistory.push('/signin');
                }
                throw new Error('Cannot patch me');
            })
            .then(() => dispatch(profileUpdated()))
            .catch(() => dispatch(updateProfileError()))
    }
}