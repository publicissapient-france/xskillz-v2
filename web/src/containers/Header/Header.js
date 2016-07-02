import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import HeaderContent from '../../components/Header/HeaderContent';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        goToSkills: () => dispatch(routeActions.push('/skills')),
        goToUsers: () => dispatch(routeActions.push('/users')),
        goToUpdates: () => dispatch(routeActions.push('/updates')),
        goToMe: () => dispatch(routeActions.push('/me'))
    };
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContent);

export default Header;