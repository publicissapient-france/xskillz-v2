import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Api from '../../components/Api/Api';

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = () => {
    return {
    };
};

const ApiPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Api);

export default ApiPage;