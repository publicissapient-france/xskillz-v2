import React, {Component, PropTypes} from 'react';

import UserItem from '../../Users/UserItem';

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
                        <UserItem onUserClick={onUserClick} key={index} user={user} showSocial={false} />
                    )}
                </div>
            </div>
        );
    }
}

export default UsersLevel;