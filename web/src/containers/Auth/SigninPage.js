import React, {Component} from 'react';

import {connect} from 'react-redux';

import {browserHistory} from 'react-router';

import SigninContent from '../../components/Auth/SigninContent';

import {signin} from '../../actions/auth';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signin: (email, password) => dispatch(signin(email, password)),
        goToSignup: () => browserHistory.push('/signup')
    };
};

const SigninPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SigninContent);

export default SigninPage;