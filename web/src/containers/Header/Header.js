import React, {Component} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import HeaderContent from "../../components/Header/HeaderContent";
import {logout} from "../../actions/auth";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = () => {
    return {
        goToSkills: () => browserHistory.push('/skills'),
        goToUsers: () => browserHistory.push('/users'),
        goToManagement: () => browserHistory.push('/management'),
        goToUpdates: () => browserHistory.push('/updates'),
        goToHelp: () => browserHistory.push('/help'),
        goToMe: () => browserHistory.push('/me'),
        goToSettings: () => browserHistory.push('/settings'),
        goToLogout: () => {
            logout();
            browserHistory.push(`/signin`);
        }
    };
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContent);

export default Header;