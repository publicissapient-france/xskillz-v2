import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import SettingsContent from '../../components/Settings/SettingsContent'

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsContent);

export default SettingsContent;