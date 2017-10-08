import store from 'store';

import {
    APP_INFO_GOT,
} from '../actions/action.appInfo';

const LS_APP_INFO = 'app.info';

// noinspection JSUnresolvedFunction
const lsAppInfo = store.get(LS_APP_INFO);
const initialState = {
    hasUpdate: false,
    ...lsAppInfo,
};

export function appInfo(state = initialState, action) {
    switch (action.type) {
        case APP_INFO_GOT:
            // noinspection JSUnresolvedFunction
            store.set(LS_APP_INFO, action.payload.appInfo);
            return Object.assign({}, state, {
                hasUpdate: state.version && state.version !== action.payload.appInfo.version,
            });
        default:
            return state;
    }
}