import React, { Component, PropTypes } from 'react';
import UserItem from './UserItem';

import CircularProgress from 'material-ui/CircularProgress';

class UserContent extends Component {

    componentDidMount() {
        const { loaded, user } = this.props.user;
        const userId = this.props.params.id;
        if (!loaded || user.id !== userId) {
            this.props.getUserById(userId);
        }
    }

    render() {

        const { loaded } = this.props.user;

        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }

        const user = this.props.user.user;

        return (
            <div className="content">
                <UserItem user={user} details/>
            </div>
        )
    }

}

export default UserContent;