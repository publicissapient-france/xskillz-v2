import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

import UsersLevel from './UsersLevel/UsersLevel';

class SkillsContent extends Component {

    constructor(props) {
        super(props);

        this.onNewRequest = this.onNewRequest.bind(this);

        this.search = true;
    }

    componentDidMount() {
        const { loaded } = this.props.skills;
        if (!loaded) {
            this.props.fetchSkills();
        } else {
            this.componentDidUpdate();
        }
    }

    componentDidUpdate() {
        const { name } = this.props.location.query;
        const { loaded } = this.props.skills;

        if (loaded && name && this.search) {
            this.onNewRequest(name);
            this.search = false;
        }
    }

    onNewRequest(name) {
        var skill = _.find(this.props.skills.list, (s) => s.name === name);
        if (skill) {
            this.props.fetchUsersBySkillId(skill.id, name);
        }
    }

    static composeUsers = (skillId, users) => {
        const ret = {0: [], 1: [], 2: [], 3: []};
        _.each(users, user => {
            _.each(user.domains, domain => {
                _.each(domain.skills, skill => {
                    if (skill.id === skillId) {
                        ret[skill.level].push({...user, skill});
                    }
                })
            });
        });
        return ret;
    };

    render() {

        const { loaded } = this.props.skills;
        const { onUserClick } = this.props;

        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }

        var skills = this.props.skills.list;
        var users = this.props.users.bySkill.list;

        var nameArray = [];
        _.each(skills, (s) => nameArray.push(s.name));

        const { name } = this.props.location.query;

        const composedUsers = SkillsContent.composeUsers(19, users);

        return (
            <div className="content">
                <div className="auto-complete">
                    <AutoComplete hintText={'Enter skill name...'}
                                  dataSource={nameArray}
                                  filter={AutoComplete.fuzzyFilter}
                                  onNewRequest={this.onNewRequest}
                                  searchText={name}/>
                </div>
                {composedUsers[3].length > 0 && <UsersLevel title="Expert" users={composedUsers[3]}/>}
                {composedUsers[2].length > 0 && <UsersLevel title="Confirmed" users={composedUsers[2]}/>}
                {composedUsers[1].length > 0 && <UsersLevel title="Beginner" users={composedUsers[1]}/>}
                {composedUsers[0].length > 0 && <UsersLevel title="Newbie" users={composedUsers[0]}/>}
            </div>
        )
    }

}

export default SkillsContent;