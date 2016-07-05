import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignupContent from '../../components/Auth/SignupContent';
import { signup } from '../../actions/auth';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signup: (name, email, password) => dispatch(signup(name, email, password))
    };
};

const SignupPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupContent);

export default SignupPage;