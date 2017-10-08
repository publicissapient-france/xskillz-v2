import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import {getAppInfo} from '../actions/action.appInfo';

const mapStateToProps = state => ({
    appInfo: state.appInfo,
});

const mapDispatchToProps = dispatch => ({
    getAppInfo: () => dispatch(getAppInfo()),
});

class UpdateHintContent extends Component {

    static propTypes = {
        getAppInfo: PropTypes.func.isRequired,
        appInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.props.getAppInfo();
    }

    onSnackbarActionTap = () => {
        window.location.reload();
    };

    render() {
        return <Snackbar
            open={this.props.appInfo.hasUpdate}
            message={'Nouvelle version Skillz disponible.'}
            action="mettre à jour"
            onActionTouchTap={this.onSnackbarActionTap}/>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHintContent);