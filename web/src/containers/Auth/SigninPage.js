import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import SigninContent from '../../components/Auth/SigninContent';
import { signin } from '../../actions/auth';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signin: (email, password) => dispatch(signin(email, password))
    };
};

const SigninPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SigninContent);

export default SigninPage;