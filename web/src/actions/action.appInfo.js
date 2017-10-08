export const APP_INFO_GOT = 'APP_INFO_GOT';

export function appInfoGot(appInfo) {
    return {
        type: APP_INFO_GOT,
        payload: {appInfo},
    }
}

export function getAppInfo() {
    return dispatch => {
        const config = {
            method: 'GET',
        };
        return fetch(`/dist/app.info`, config)
            .then(response => response.json())
            .then(appInfo => dispatch(appInfoGot(appInfo)));
    };
}