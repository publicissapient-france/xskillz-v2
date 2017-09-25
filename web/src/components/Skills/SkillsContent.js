import React, {Component, PropTypes} from "react";
import _ from "lodash";
import AutoComplete from "material-ui/AutoComplete";
import CircularProgress from "material-ui/CircularProgress";
import UsersLevel from "./UsersLevel/UsersLevel";
import {clean} from "../../services/strings";

class SkillsContent extends Component {

    constructor(props) {
        super(props);
        this.search = true;
    }

    componentDidMount() {
        const {loaded} = this.props.skills;
        if (!loaded) {
            this.props.fetchSkills();
        } else {
            this.componentDidUpdate();
        }
    }

    componentDidUpdate() {
        const {name} = this.props.location.query;
        const {loaded} = this.props.skills;

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
            if(user.level) {
                ret[user.level].push({...user});
            }
        });
        return ret;
    };

    filter(searchText, key) {
        if (!searchText) {
            return true;
        }
        return clean(key).indexOf(clean(searchText)) >= 0;
    }

    render() {

        const {loaded} = this.props.skills;
        const {onUserClick} = this.props;

        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }

        var skills = this.props.skills.list;
        var users = this.props.users.bySkill.list;

        var nameArray = [];
        _.each(skills, (s) => nameArray.push(s.name));

        const {name} = this.props.location.query;

        const composedUsers = SkillsContent.composeUsers(19, users);

        return (
            <div className="content">
                <div className="auto-complete">
                    <AutoComplete
                        autoFocus={true}
                        hintText={'Chercher une compétence ...'}
                        dataSource={nameArray}
                        menuStyle={{cursor: 'pointer'}}
                        filter={::this.filter}
                        onNewRequest={::this.onNewRequest}
                        searchText={name}
                        maxSearchResults={10}/>
                </div>
                {composedUsers[3].length > 0 &&
                <UsersLevel title="Experts" users={composedUsers[3]} onUserClick={onUserClick}/>}
                {composedUsers[2].length > 0 &&
                <UsersLevel title="Confirmés" users={composedUsers[2]} onUserClick={onUserClick}/>}
                {composedUsers[1].length > 0 &&
                <UsersLevel title="Débutants" users={composedUsers[1]} onUserClick={onUserClick}/>}
                {composedUsers[0].length > 0 &&
                <UsersLevel title="Intéressés" users={composedUsers[0]} onUserClick={onUserClick}/>}
            </div>
        )
    }

}

export default SkillsContent;