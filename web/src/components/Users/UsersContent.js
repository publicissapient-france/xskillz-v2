import React, {Component, PropTypes} from "react";
import _ from "lodash";
import UserItem from "./UserItem";
import TextField from "material-ui/TextField";
import Infinite from "react-infinite";
import RadioButtonGroup from "material-ui/RadioButton/RadioButtonGroup";
import RadioButton from "material-ui/RadioButton/RadioButton";
import CircularProgress from "material-ui/CircularProgress";

import {clean} from "../../services/strings";

class UsersContent extends Component {

    constructor(props) {
        super(props);
        this.state = {users: null, sort: 'alphabetic'};
    }

    componentDidMount() {
        const {loaded} = this.props.users;
        if (!loaded) {
            this.props.fetchUsers();
        }
    }

    filter(list, value) {
        value = clean(value);
        return _(list)
            .filter(user => clean(user.name).indexOf(value) >= 0)
            .value();
    }

    queryChange = (event, value) => {
        if (value.length > 2) {
            const filteredUsers = this.filter(this.props.users.list, value);
            this.setState({users: filteredUsers});
        } else {
            this.setState({users: this.props.users.list});
        }
    };

    onSortChange = (event, sort) => this.setState({sort});

    render() {
        const {onUserClick, onSkillClick, removeUser, users:{loaded}} = this.props;
        const {sort} = this.state;

        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }

        let users = this.state.users || this.props.users.list;

        if (sort === 'experience') {
            users = _.sortBy(users, [user => user.experienceCounter]);
        } else {
            users = _.sortBy(users, [user => user.name.toUpperCase()]);
        }

        return (
            <div className="content">
                <TextField hintText="Nom ou prénom (min: 3 caractères)"
                           style={{margin: '.8rem'}}
                           fullWidth={true}
                           onChange={::this.queryChange}/>
                <RadioButtonGroup
                    defaultSelected="alphabetic"
                    name="sort"
                    style={{margin: '0 10px 20px 10px'}}
                    onChange={this.onSortChange}>
                    <RadioButton
                        value="alphabetic"
                        label="Alphabétique"/>
                    <RadioButton
                        value="experience"
                        label="Expérience"/>
                </RadioButtonGroup>
                <div  style={{padding: '.8rem'}}>
                <Infinite useWindowAsScrollContainer elementHeight={110}>
                    {users.map((user, index) => <UserItem user={user}
                                                          onUserClick={onUserClick}
                                                          onSkillClick={onSkillClick}
                                                          key={index}
                                                               removeUser={removeUser}/>)}
                </Infinite>
                </div>
            </div>
        )
    }

}

export default UsersContent;