import React, { Component, PropTypes } from "react";
import _ from "lodash";
import { AutoComplete, CircularProgress, RaisedButton, Snackbar, TextField } from "material-ui";
import UsersLevel from "./UsersLevel/UsersLevel";
import { clean } from "../../services/strings";
import { hasRole, MANAGER } from '../../services/permissions';

class SkillsContent extends Component {

    constructor(props) {
        super(props);
        this.search = true;
        this.state = {};
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
        const skill = _.find(this.props.skills.list, (s) => s.name === name);
        if (skill) {
            this.props.fetchUsersBySkillId(skill.id, name);
        }
    }

    updateDescription() {
        if (this.state.description) {
            this.setState({ submit: true, snackOpen: false });
            this.props.updateSkillDefinition(this.props.users.bySkill.list.skill.id, this.state.description.trim());
        }
    }

    onChangeDescription(event, description) {
        this.setState({ description });
    }

    static composeUsers = (skillId, users) => {
        const ret = { 0: [], 1: [], 2: [], 3: [] };
        _.each(users, user => {
            if (user.level) {
                ret[user.level].push({ ...user });
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

    onSnackClose = () => this.setState({ snackOpen: false, submit: false });

    render() {
        let { submit } = this.state;
        const { loaded, skillDefinitionUpdated } = this.props.skills;
        const snackOpen = !!(submit && skillDefinitionUpdated);
        const { onUserClick } = this.props;

        if (!loaded) {
            return (
                <CircularProgress style={{ position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0 }} />
            );
        }

        const skills = this.props.skills.list;
        const { skill, users } = this.props.users.bySkill.list;

        const nameArray = [];
        _.each(skills, (s) => nameArray.push(s.name));

        const { name } = this.props.location.query;

        const composedUsers = SkillsContent.composeUsers(19, users);

        return (
            <div className="content">
                <div className="auto-complete">
                    <AutoComplete
                        autoFocus={true}
                        hintText={'Chercher une compétence ...'}
                        dataSource={nameArray}
                        menuStyle={{ cursor: 'pointer' }}
                        filter={::this.filter}
                        onNewRequest={::this.onNewRequest}
                        searchText={name}
                        fullWidth={true}
                        maxSearchResults={10} />
                </div>
                {skill &&
                <div className={'skill-description'}>
                    <TextField
                        hintText={'Description'}
                        disabled={!hasRole(MANAGER)}
                        onChange={::this.onChangeDescription}
                        value={this.getDescriptionValue()}
                        fullWidth={true}
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                    />
                    {hasRole(MANAGER) &&
                    <RaisedButton onClick={::this.updateDescription} style={{ marginTop: '.8rem' }} label="Modifier"
                                  primary={true} />}
                </div>
                }
                {composedUsers[3].length > 0 &&
                <UsersLevel title="Experts" users={composedUsers[3]} onUserClick={onUserClick} />}
                {composedUsers[2].length > 0 &&
                <UsersLevel title="Confirmés" users={composedUsers[2]} onUserClick={onUserClick} />}
                {composedUsers[1].length > 0 &&
                <UsersLevel title="Débutants" users={composedUsers[1]} onUserClick={onUserClick} />}
                {composedUsers[0].length > 0 &&
                <UsersLevel title="Intéressés" users={composedUsers[0]} onUserClick={onUserClick} />}

                <Snackbar
                    bodyStyle={{ backgroundColor: '#008500' }}
                    open={snackOpen}
                    message={'Compétence mise à jour'}
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000} />
            </div>
        )
    }

    getDescriptionValue() {
        let description = '';
        if (this.state && this.state.description) {
            description = this.state.description;
        }
        if (this.props.users.bySkill.list.skill && !(this.state && this.state.description !== undefined)) {
            description = this.props.users.bySkill.list.skill.description;
        }
        return description || '';
    }
}

export default SkillsContent;