import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';


import { App } from 'containers/App';
import { NotFound } from 'containers/NotFound';
import SkillsPage from 'containers/Skills/SkillsPage';
import UsersPage from 'containers/Users/UsersPage';
import Header from 'containers/Header/Header';
import UpdatesPage from 'containers/Updates/UpdatesPage';
import SigninPage from 'containers/Auth/SigninPage';
import MePage from 'containers/Me/MePage';

import configureStore from './store/configureStore';

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>

            <Redirect from="/" to="updates"/>

            <Route path="/" component={App}>

                <Route path="signin"
                       components={{main: SigninPage}}
                       dataTypePage="signin"/>

                <Route path="updates"
                       components={{main: UpdatesPage, header: Header}}
                       dataTypePage="updates"/>

                <Route path="skills"
                       components={{main: SkillsPage, header: Header}}
                       dataTypePage="skills"/>

                <Route path="skills?name=:name"
                       components={{main: SkillsPage, header: Header}}
                       dataTypePage="skills"/>

                <Route path="users"
                       components={{main: UsersPage, header: Header}}
                       dataTypePage="users"/>

                <Route path="users?name=:name"
                       components={{main: UsersPage, header: Header}}
                       dataTypePage="users"/>

                <Route path="me"
                       components={{main: MePage, header: Header}}
                       dataTypePage="me"/>

                <Route status={404}
                       path="*"
                       components={{main: NotFound}}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);