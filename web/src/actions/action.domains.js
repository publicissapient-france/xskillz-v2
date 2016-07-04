import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import store from 'store';
import Config from '../Config';

export const DOMAINS_GOT = 'DOMAINS_GOT';

export function domainsGot(domains) {
    return {
        type: DOMAINS_GOT,
        payload: {
            domains
        }
    }
}

export function fetchDomains() {
    return dispatch => {

        const config = {
            method: 'GET',
            headers: {'token': store.get('me').token}
        };

        return fetch(`${Config.apiURL}/domains`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(domains => dispatch(domainsGot(domains)));
    }
}

export const SKILL_LINKED_TO_DOMAIN = 'SKILL_LINKED_TO_DOMAIN';

export function skillLinkedToDomain() {
    return {
        type: SKILL_LINKED_TO_DOMAIN
    }
}

export function linkSkillToDomain(payload) {
    return dispatch => {
        const id = payload.skill.id;
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: store.get('me').token
            },
            body: JSON.stringify({id})
        };

        return fetch(`${Config.apiURL}/domains/${payload.domain.id}/skills`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    browserHistory.push('/signin');
                } else {
                    throw new Error();
                }
            })
            .then(json => dispatch(skillLinkedToDomain(json)));
    };
}

export const DOMAIN_REMOVED = 'DOMAIN_REMOVED';

export function domainRemoved() {
    return {
        type: DOMAIN_REMOVED
    }
}

export function deleteDomain(id) {
    return dispatch => {
        const config = {
            method: 'DELETE',
            headers: {
                token: store.get('me').token
            }
        };
        return fetch(`${Config.apiURL}/domains/${id}`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    browserHistory.push('/signin');
                } else {
                    throw new Error();
                }
            })
            .then(() => dispatch(domainRemoved()));
    }
}

export const DOMAIN_ADDED = 'DOMAIN_ADDED';

export function domainAdded() {
    return {
        type: DOMAIN_ADDED
    }
}

export function addDomain(payload) {
    return dispatch => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: store.get('me').token
            },
            body: JSON.stringify(payload)
        };

        return fetch(`${Config.apiURL}/domains`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    browserHistory.push('/signin');
                } else {
                    throw new Error();
                }
            })
            .then(json => dispatch(domainAdded()));
    };
}