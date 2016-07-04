import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import HeaderContent from '../../components/Header/HeaderContent';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = () => {
    return {
        goToSkills: () => browserHistory.push('/skills'),
        goToUsers: () => browserHistory.push('/users'),
        goToUpdates: () => browserHistory.push('/updates'),
        goToMe: () => browserHistory.push('/me')
    };
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContent);

export default Header;