import _ from 'lodash';
import store from 'store';

export const UPDATES = 'updates';
export const SKILLS = 'skills';
export const USERS = 'users';
export const MANAGEMENT = 'management';
export const SETTINGS = 'settings';

export function hasRole(role) {
    const me = store.get('me');
    const normalizedRole = role.replace(/\//, '');
    if (me) {
        return _.findIndex(me.roles, normalizedRole) >= 0;
    }
    return false;
}

export function checkPermission(next, replace) {
    if (hasRole(next.location.pathname)) {
        replace(next.location.pathname);
    } else {
        replace('/unauthorized');
    }
}