import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { skills } from './skills';
import { users } from './users';
import { updates } from './updates';
import { auth } from './auth';
import { me } from './reducer.me';

const reducer = combineReducers({
    routing: routeReducer,
    /* your reducers */
    skills,
    users,
    updates,
    auth,
    me
});

export default reducer;
