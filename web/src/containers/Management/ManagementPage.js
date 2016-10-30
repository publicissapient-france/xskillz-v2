import React, {Component} from "react";
import {connect} from "react-redux";
import ManagementContent from "../../components/Management/ManagementContent";
import {fetchManagement} from "../../actions/management";

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchManagement: () => dispatch(fetchManagement())
    };
};

const ManagementPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementContent);

export default ManagementPage;