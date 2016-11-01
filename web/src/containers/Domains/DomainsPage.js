import React, {Component} from "react";
import {connect} from "react-redux";
import DomainsContent from "../../components/Domain/DomainsContent";
import {fetchDomainsWithSkills} from "../../actions/action.domains";
import {browserHistory} from "react-router";

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDomainsWithSkills: () => dispatch(fetchDomainsWithSkills()),
        onSkillClick: name => browserHistory.push(`/skills?name=${name}`)
    };
};

const DomainsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(DomainsContent);

export default DomainsPage;