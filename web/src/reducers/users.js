import {
    AVAILABILITY_DATE_SAVED,
    DIPLOMA_SAVED,
    EMPLOYEE_DATE_SAVED,
    EMPLOYEE_END_DATE_SAVED,
    RECEIVE_MANAGERS,
    RECEIVE_USER_BY_ID,
    RECEIVE_USERS,
    RECEIVE_USERS_BY_SKILL,
    REQUEST_USER_BY_ID,
    REQUEST_USERS,
    USER_ASSIGNED_TO_MANAGER,
} from '../actions/users';

const initialState = {
    list: [],
    managers: [],
    user: {},
    bySkill: {
        skillId: undefined,
        list: [],
        loaded: false
    },
    userAssigned: false,
    loaded: false
};

export function users(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USERS:
        case REQUEST_USER_BY_ID:
            return Object.assign({}, state, {
                loaded: false
            });
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                list: action.payload.users,
                loaded: true
            });
        case RECEIVE_USERS_BY_SKILL:
            return Object.assign({}, state, {
                bySkill: {
                    skillId: action.payload.skillId,
                    list: action.payload.users,
                    loaded: true
                }
            });
        case RECEIVE_USER_BY_ID:
            return Object.assign({}, state, {
                user: action.payload.user,
                loaded: true
            });
        case RECEIVE_MANAGERS:
            return Object.assign({}, state, {
                managers: action.payload.managers
            });
        case DIPLOMA_SAVED:
            return Object.assign({}, state, {
                diplomaSaved: true
            });
        case EMPLOYEE_DATE_SAVED:
            return Object.assign({}, state, {
                employeeDateSaved: true
            });
        case EMPLOYEE_END_DATE_SAVED:
            return Object.assign({}, state, {
                employeeEndDateSaved: true
            });
        case AVAILABILITY_DATE_SAVED:
            return Object.assign({}, state, {
                employeeAvailabilityDateSaved: true
            });
        case USER_ASSIGNED_TO_MANAGER:
            return Object.assign({}, state, {
                userAssigned: true,
            });
        default:
            return state;
    }
}