import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {skills} from './skills';
import {users} from './users';
import {updates} from './updates';
import {auth} from './auth';
import {me} from './reducer.me';
import {user} from './reducer.user';
import {domains} from './reducer.domains';
import {management} from './reducer.management';

const reducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    skills,
    users,
    updates,
    auth,
    me,
    user,
    domains,
    management
});

export default reducer;
