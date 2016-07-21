import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';

import UserSimple from '../../Users/UserSimple/UserSimple';

import './UsersLevel.less';

class UsersLevel extends Component {

    static propTypes = {
        onUserClick: PropTypes.func
    };

    render() {
        const {onUserClick, title, users} = this.props;
        return (
            <div className="users-level">
                <h2>{title}</h2>
                <div className="users-container">
                    {users.map((user, index) =>
                        <UserSimple onUserClick={onUserClick} key={index} user={user}/>
                    )}
                </div>
            </div>
        );
    }
}

export default UsersLevel;