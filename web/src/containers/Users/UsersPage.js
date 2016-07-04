import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

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
        onUserClick: id => browserHistory.push(`/user/${id}`),
        onSkillClick: name => browserHistory.push(`/skills?name=${name}`)
    };
};

const UsersPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersContent);

export default UsersPage;