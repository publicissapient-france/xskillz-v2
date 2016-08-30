import React, {Component, PropTypes } from 'react';
import _ from 'lodash';
import UserItem from './UserItem';
import TextField from 'material-ui/TextField';
import Infinite from 'react-infinite';

import CircularProgress from 'material-ui/CircularProgress';

class UsersContent extends Component {

    constructor(props) {
        super(props);
        this.state = {users: null};
    }

    componentDidMount() {
        const {loaded} = this.props.users;
        if (!loaded) {
            this.props.fetchUsers();
        }
    }

    queryChange = (event, value) => {
        if (value.length > 2) {
            this.setState({users: _.filter(this.props.users.list, user => user.name.toLowerCase().indexOf(value.toLowerCase()) >= 0)});
        } else {
            this.setState({users: this.props.users.list});
        }
    };

    render() {
        const {loaded} = this.props.users;
        const {onUserClick, onSkillClick, removeUser} = this.props;

        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }

        const users = this.state.users || this.props.users.list;

        return (
            <div className="content">
                <TextField hintText="Nom ou prénom (min: 3 caractères)" style={{margin: '.8rem'}}
                           onChange={::this.queryChange}/>
                <Infinite useWindowAsScrollContainer elementHeight={110}>
                    {users.map((user, index) => <UserItem user={user}
                                                          onUserClick={onUserClick}
                                                          onSkillClick={onSkillClick}
                                                          key={index}
                                                          removeUser={removeUser}/>)}
                </Infinite>
            </div>
        )
    }

}

export default UsersContent;