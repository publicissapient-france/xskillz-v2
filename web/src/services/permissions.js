import store from 'store';

export const UPDATES = 'updates';
export const SKILLS = 'skills';
export const USERS = 'users';
export const MANAGEMENT = 'management';
export const SETTINGS = 'settings';
export const MANAGER = 'manager';

export function hasRole(role) {
    const me = store.get('me');
    const normalizedRole = role.replace(/\//, '').toLowerCase();
    if (me) {
        return me.roles.indexOf(normalizedRole) >= 0;
    }
    return false;
}

export function checkPermission(next, replace) {
    if (!hasRole(next.location.pathname)) {
        replace('/unauthorized');
    }
}