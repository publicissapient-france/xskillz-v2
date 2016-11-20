import fetch from "isomorphic-fetch";
import {browserHistory} from "react-router";
import Config from "../Config";
import {getToken} from "./auth";

export const REQUEST_USERS_BY_SKILL = 'REQUEST_USERS_BY_SKILL';
export const RECEIVE_USERS_BY_SKILL = 'RECEIVE_USERS_BY_SKILL';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_USER_BY_ID = 'REQUEST_USER_BY_ID';
export const RECEIVE_USER_BY_ID = 'RECEIVE_USER_BY_ID';


export function requestUsersBySkill(skillId) {
    return {
        type: REQUEST_USERS_BY_SKILL,
        payload: {
            skillId: skillId
        }
    }
}

export function fetchUsersBySkill(skillId) {
    return (dispatch) => {

        dispatch(requestUsersBySkill(skillId));

        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                token: getToken()
            }
        };

        return fetch(`${Config.apiURL}/skills/${skillId}/users`, config)
            .then((response) => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(receiveUsersBySkill(json, skillId)));
    }
}

export function requestUsers() {
    return {
        type: REQUEST_USERS
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        payload: {
            users: users
        }
    }
}

export function receiveUsersBySkill(users, skillId) {
    return {
        type: RECEIVE_USERS_BY_SKILL,
        payload: {
            users: users,
            skillId: skillId
        }
    }
}

export function fetchUsers() {
    return (dispatch) => {
        dispatch(requestUsers());

        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                token: getToken()
            }
        };

        return fetch(`${Config.apiURL}/users`, config)
            .then((response) => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(receiveUsers(json)))
    };
}

export const DIPLOMA_SAVED = 'DIPLOMA_SAVED';

export function diplomaSaved() {
    return {
        type: DIPLOMA_SAVED
    }
}

export function saveDiploma(userId, diploma) {
    return dispatch => {
        const config = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: getToken()
            },
            body: JSON.stringify({diploma: diploma.toISOString().split('T')[0]})
        };
        return fetch(`${Config.apiURL}/users/${userId}`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(responseBody => dispatch(diplomaSaved()));
    };
}


export const EMPLOYEE_DATE_SAVED = 'EMPLOYEE_DATE_SAVED';

export function employeeDate() {
    return {
        type: EMPLOYEE_DATE_SAVED
    }
}

export function saveEmployeeDate(userId, employeeDate) {
    return dispatch => {
        const config = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: getToken()
            },
            body: JSON.stringify({employee_date: employeeDate.toISOString().split('T')[0]})
        };
        return fetch(`${Config.apiURL}/users/${userId}`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(responseBody => dispatch(employeeDateSaved()));
    };
}

export const USER_REMOVED = 'USER_REMOVED';

export function userRemoved(userId) {
    return {
        type: USER_REMOVED,
        payload: {
            userId
        }
    }
}

export function removeUser(userId) {
    return dispatch => {
        const config = {
            method: 'DELETE',
            headers: {
                token: getToken()
            }
        };
        return fetch(`${Config.apiURL}/users/${userId}`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(responseBody => dispatch(userRemoved(userId)))
    }
}

export const USER_ASSIGNED_TO_MANAGER = 'USER_ASSIGNED_TO_MANAGER';

export function userAssignedToManager(userId, managerId) {
    return {
        type: USER_ASSIGNED_TO_MANAGER,
        payload: {userId, managerId}
    }
}

export function assignUserToManager(userId, managerId) {
    return dispatch => {
        const config = {
            method: 'POST',
            headers: {
                token: getToken()
            }
        };
        return fetch(`${Config.apiURL}/users/${userId}/manager/${managerId}`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(responseBody => dispatch(userAssignedToManager(userId, managerId)))
    }
}

export const RECEIVE_MANAGERS = 'RECEIVE_MANAGERS';

export function receiveManagers(managers) {
    return {
        type: RECEIVE_MANAGERS,
        payload: {managers}
    }
}

export function fetchManagers() {
    return dispatch => {
        const config = {
            method: 'GET',
            headers: {
                token: getToken()
            }
        };
        return fetch(`${Config.apiURL}/users?with_roles=Manager`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(managers => dispatch(receiveManagers(managers)));
    };
}

export const MANAGER_PROMOTED = 'MANAGER_PROMOTED';

export function managerPromoted() {
    return {
        type: MANAGER_PROMOTED
    }
}

export function promoteManager(id) {
    return dispatch => {
        const config = {
            method: 'POST',
            headers: {
                token: getToken()
            }
        };
        return fetch(`${Config.apiURL}/users/${id}/manager`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(() => {
                dispatch(managerPromoted());
                dispatch(fetchManagers());
            });
    }
}