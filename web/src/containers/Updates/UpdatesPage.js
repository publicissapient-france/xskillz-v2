import React, {Component} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import UpdatesContent from "../../components/Updates/UpdatesContent";
import {fetchUpdates} from "../../actions/updates";

const mapStateToProps = (state) => {
    return {
        updates: state.updates
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUpdatesByCompany: companyId => dispatch(fetchUpdates(companyId)),
        onUserClick: id => browserHistory.push(`/user/${id}`),
        onSkillClick: name => browserHistory.push(`/skills?name=${name}`)
    };
};

const UpdatesPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatesContent);

export default UpdatesPage;