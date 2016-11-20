import React from 'react';

import {connect} from 'react-redux';

import SettingsContent from '../../components/Settings/SettingsContent'

import {fetchDomains, linkSkillToDomain, deleteDomain, addDomain} from '../../actions/action.domains';
import {fetchSkills, mergeSkills} from '../../actions/skills';
import {saveDiploma, saveEmployeeDate} from '../../actions/users'
import {fetchUsers, assignUserToManager, fetchManagers, promoteManager} from '../../actions/users';
import {createUser} from '../../actions/auth';

const mapStateToProps = state => {
    return {
        domains: state.domains,
        skills: state.skills,
        users: state.users,
        auth: state.auth,
        me: state.me
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDomains: () => dispatch(fetchDomains()),
    fetchSkills: () => dispatch(fetchSkills()),
    linkSkillToDomain: payload => dispatch(linkSkillToDomain(payload)),
    deleteDomain: id => dispatch(deleteDomain(id)),
    addDomain: payload => dispatch(addDomain(payload)),
    mergeSkills: payload => dispatch(mergeSkills(payload)),
    saveDiploma: (userId, date) => dispatch(saveDiploma(userId, date)),
    saveEmployeeDate: (userId, date) => dispatch(saveEmployeeDate(userId, date)),
    fetchUsers: () => dispatch(fetchUsers()),
    assignUserToManager: (userId, managerId) => dispatch(assignUserToManager(userId, managerId)),
    fetchManagers: () => dispatch(fetchManagers()),
    promoteManager: id => dispatch(promoteManager(id)),
    createUser: (name, email, password) => dispatch(createUser(name, email, password))
});

const SettingsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsContent);

export default SettingsPage;