import React, {Component} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import UserContent from "../../components/Users/UserContent";
import {getUserById} from "../../actions/user";

const mapStateToProps = state => {
    return {
        user: state.user,
        onSkillClick: name => browserHistory.push(`/skills?name=${name}`),
        onUserClick: id => browserHistory.push(`/user/${id}`),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserById: id => dispatch(getUserById(id))
    };
};

const UsersPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserContent);

export default UsersPage;