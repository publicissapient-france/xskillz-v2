import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, browserHistory} from 'react-router';


import {App} from 'containers/App';
import {NotFound} from 'containers/NotFound';
import SkillsPage from 'containers/Skills/SkillsPage';
import UsersPage from 'containers/Users/UsersPage';
import UserPage from 'containers/Users/UserPage';
import HelpPage from 'containers/Help/HelpPage';
import ManagementPage from 'containers/Management/ManagementPage';
import Header from 'containers/Header/Header';
import UpdatesPage from 'containers/Updates/UpdatesPage';
import SigninPage from 'containers/Auth/SigninPage';
import SignupPage from 'containers/Auth/SignupPage';
import UnauthorizedPage from 'containers/Auth/UnauthorizedPage';
import MePage from 'containers/Me/MePage';
import SettingsPage from 'containers/Settings/SettingsPage';
import ApiPage from 'containers/Api/ApiPage';
import DomainsPage from 'containers/Domains/DomainsPage';

import {checkPermission} from './services/permissions';
import configureStore from './store/configureStore';

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>

            <Redirect from="/" to="me"/>

            <Route path="/" component={App}>

                <Route path="signin"
                       components={{main: SigninPage}}
                       dataTypePage="signin"/>

                <Route path="signup"
                       components={{main: SignupPage}}/>

                <Route path="updates"
                       components={{main: UpdatesPage, header: Header}}
                       dataTypePage="updates" onEnter={checkPermission}/>

                <Route path="skills"
                       components={{main: SkillsPage, header: Header}}
                       dataTypePage="skills" onEnter={checkPermission}/>

                <Route path="skills?name=:name"
                       components={{main: SkillsPage, header: Header}}
                       dataTypePage="skills"/>

                <Route path="users"
                       components={{main: UsersPage, header: Header}}
                       dataTypePage="users" onEnter={checkPermission}/>

                <Route path="domains"
                       components={{main: DomainsPage, header: Header}}
                       dataTypePage="domains"/>

                <Route path="user/:id"
                       components={{main: UserPage, header: Header}}
                       name="user" dataTypePage="user"/>

                <Route path="users?name=:name"
                       components={{main: UsersPage, header: Header}}
                       dataTypePage="users"/>

                <Route path="me"
                       components={{main: MePage, header: Header}}
                       dataTypePage="me"/>

                <Route path="help"
                       components={{main: HelpPage, header: Header}}
                       dataTypePage="help"/>

                <Route path="management"
                       components={{main: ManagementPage, header: Header}}
                       dataTypePage="management" onEnter={checkPermission}/>

                <Route path="settings"
                       components={{main: SettingsPage, header: Header}}
                       dataTypePage="settings" onEnter={checkPermission}/>

                <Route path="api"
                       components={{main: ApiPage, header: Header}}
                       dataType="api"/>

                <Route path="unauthorized"
                       components={{main: UnauthorizedPage, header: Header}}/>

                <Route status={404}
                       path="*"
                       components={{main: NotFound}}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);