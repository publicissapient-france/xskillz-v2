import React, {Component, PropTypes} from "react";

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';

class ChangePassword extends Component {

    static propTypes = {
        changePassword: PropTypes.func.isRequired,
        me: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {oldPassword: null, password: null};
    }

    setOldPassword = event => this.setState({oldPassword: event.currentTarget.value});

    setPassword = event => this.setState({password: event.currentTarget.value});

    changePassword = () => {
        this.setState({submit: true});
        return this.props.changePassword(this.state.oldPassword, this.state.password);
    };

    render() {
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Changer de mot de passe</h3>
                <div>
                    <TextField floatingLabelText="Ancien mot de passe" onBlur={::this.setOldPassword} type="password"/>
                    <TextField floatingLabelText="Nouveau mot de passe" onBlur={::this.setPassword} type="password"/>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Changer" primary={true} onClick={::this.changePassword}/>
                    </div>
                </div>
                <Snackbar
                    bodyStyle={{backgroundColor: '#CC0000'}}
                    open={this.state.submit && this.props.me.patchMe.error}
                    message="Changement de mot de passe échoué."
                    autoHideDuration={3000}/>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={this.state.submit && this.props.me.patchMe.success}
                    message="Mot de passe changé."
                    autoHideDuration={3000}/>
            </Paper>
        )
    }
}

export default ChangePassword;