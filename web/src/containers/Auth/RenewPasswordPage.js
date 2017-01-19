import React, {Component} from 'react';

import {connect} from 'react-redux';

import {browserHistory} from 'react-router';

import RenewPasswordContent from '../../components/Auth/RenewPasswordContent';

import {notifyPasswordChange} from '../../actions/auth';

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        notifyPasswordChange: email => dispatch(notifyPasswordChange(email))
    };
};

const RenewPasswordPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(RenewPasswordContent);

export default RenewPasswordPage;