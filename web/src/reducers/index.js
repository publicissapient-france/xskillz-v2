import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {skills} from './skills';
import {users} from './users';
import {auth} from './auth';
import {me} from './reducer.me';
import {user} from './reducer.user';
import {domains} from './reducer.domains';
import {management} from './reducer.management';
import {appInfo} from './reducer.appInfo';

const reducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    skills,
    users,
    auth,
    me,
    user,
    domains,
    management,
    appInfo,
});

export default reducer;
