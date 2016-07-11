import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import SettingsContent from '../../components/Settings/SettingsContent'
import { fetchDomains, linkSkillToDomain, deleteDomain, addDomain } from '../../actions/action.domains';
import { fetchSkills, mergeSkills } from '../../actions/skills';

const mapStateToProps = state => {
    return {
        domains: state.domains,
        skills: state.skills
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDomains: () => dispatch(fetchDomains()),
        fetchSkills: () => dispatch(fetchSkills()),
        linkSkillToDomain: payload => dispatch(linkSkillToDomain(payload)),
        deleteDomain: id => dispatch(deleteDomain(id)),
        addDomain: payload => dispatch(addDomain(payload)),
        mergeSkills: payload => dispatch(mergeSkills(payload))
    };
};

const SettingsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsContent);

export default SettingsPage;