import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import SettingsContent from '../../components/Settings/SettingsContent'
import { fetchDomains, linkSkillToDomain, deleteDomain, addDomain } from '../../actions/action.domains';
import { fetchSkills, mergeSkills } from '../../actions/skills';
import { saveDiploma } from '../../actions/users'
import { fetchUsers, assignUserToManager } from '../../actions/users';

const mapStateToProps = state => {
    return {
        domains: state.domains,
        skills: state.skills,
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDomains: () => dispatch(fetchDomains()),
        fetchSkills: () => dispatch(fetchSkills()),
        linkSkillToDomain: payload => dispatch(linkSkillToDomain(payload)),
        deleteDomain: id => dispatch(deleteDomain(id)),
        addDomain: payload => dispatch(addDomain(payload)),
        mergeSkills: payload => dispatch(mergeSkills(payload)),
        saveDiploma: (userId, date) => dispatch(saveDiploma(userId, date)),
        fetchUsers: () => dispatch(fetchUsers()),
        assignUserToManager: (userId, managerId) => dispatch(assignUserToManager(userId, managerId))
    };
};

const SettingsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsContent);

export default SettingsPage;