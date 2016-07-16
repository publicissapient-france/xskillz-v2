import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import UserSimple from '../../Users/UserSimple/UserSimple';

import './UsersLevel.less';

class UsersLevel extends Component {

    render() {
        const {title, users} = this.props;
        return (
            <div className="users-level">
                <h2>{title}</h2>
                {users.map((user, index) =>
                    <UserSimple key={index} user={user}/>
                )}
            </div>
        );
    }
}

export default UsersLevel;