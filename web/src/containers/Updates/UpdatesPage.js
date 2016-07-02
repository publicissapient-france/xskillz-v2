import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import UpdatesContent from '../../components/Updates/UpdatesContent'

import { fetchUpdatesByCompany } from '../../actions/updates';

const mapStateToProps = (state) => {
    return {
        updates: state.updates
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUpdatesByCompany: (companyId) => dispatch(fetchUpdatesByCompany(companyId)),
        onUserClick: (name) => dispatch(routeActions.push(`/users?name=${name}`)),
        onSkillClick: (name) => dispatch(routeActions.push(`/skills?name=${name}`))
    };
};

const UpdatesPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatesContent);

export default UpdatesPage;