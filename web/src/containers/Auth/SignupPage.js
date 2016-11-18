import React, {Component} from 'react';

import {connect} from 'react-redux';

import SignupContent from '../../components/Auth/SignupContent';

import {signup} from '../../actions/auth';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
    signup: (email, name, password) => dispatch(signup(name, email, password))
});

const SignupPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupContent);

export default SignupPage;