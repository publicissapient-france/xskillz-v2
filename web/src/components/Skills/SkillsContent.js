import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

import SkillUserItem from './SkillUserItem';

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

        return (
            <div className="content">
                <div className="auto-complete">
                    <AutoComplete hintText={'Enter skill name...'}
                                  dataSource={nameArray}
                                  filter={AutoComplete.fuzzyFilter}
                                  onNewRequest={this.onNewRequest}
                                  searchText={name}/>
                </div>

                {users.map((user, index) => {
                    return (
                        <SkillUserItem key={index} user={user} onUserClick={onUserClick}/>
                    )
                })}
            </div>
        )
    }

}

export default SkillsContent;