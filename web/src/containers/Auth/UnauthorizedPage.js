import React, {Component} from 'react';

import {connect} from 'react-redux';

import UnauthorizedContent from '../../components/Auth/UnauthorizedContent';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({});

const UnauthorizedPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnauthorizedContent);

export default UnauthorizedPage;