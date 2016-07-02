import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import UsersContent from '../../components/Users/UsersContent'

import { fetchUsers, getUserById } from '../../actions/users';
import {  } from '../../actions/skills';

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        getUserById: (id, name) => {
            dispatch(getUserById(id));
            dispatch(routeActions.push(`/users?name=${name}`));
        },
        onUserClick: (name) => dispatch(routeActions.push(`/users?name=${name}`)),
        onSkillClick: (name) => dispatch(routeActions.push(`/skills?name=${name}`))
    };
};

const UsersPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersContent);

export default UsersPage;