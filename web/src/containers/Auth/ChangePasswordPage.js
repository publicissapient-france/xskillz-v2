import React, {Component} from 'react';

import {connect} from 'react-redux';

import {browserHistory} from 'react-router';

import ChangePasswordContent from '../../components/Auth/ChangePasswordContent';

import {changePassword} from '../../actions/auth';

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        changePassword: (id, token, password) => dispatch(changePassword(id, token, password))
    };
};

const ChangePasswordPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswordContent);

export default ChangePasswordPage;