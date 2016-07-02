import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import SigninContent from '../../components/Auth/SigninContent';
import { apiSignin } from '../../actions/auth';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiSignin: (email) => dispatch(apiSignin(email))
    };
};

const SigninPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SigninContent);

export default SigninPage;