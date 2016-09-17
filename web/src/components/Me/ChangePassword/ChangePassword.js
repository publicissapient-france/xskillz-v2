import React, {Component, PropTypes} from "react";

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';

class ChangePassword extends Component {

    static propTypes = {
        changePassword: PropTypes.func.isRequired,
        me: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {oldPassword: null, password: null};
    }

    setOldPassword = event => this.setState({oldPassword: event.currentTarget.value});

    setPassword = event => this.setState({password: event.currentTarget.value});

    changePassword = () => this.props.changePassword({
        oldPassword: this.state.oldPassword,
        password: this.state.password
    });

    render() {
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Changer de mot de passe</h3>
                <div>
                    <TextField floatingLabelText="Ancien mot de passe" onBlur={::this.setOldPassword}/>
                    <TextField floatingLabelText="Nouveau mot de passe" onBlur={::this.setPassword}/>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Changer" primary={true} onClick={::this.changePassword}/>
                    </div>
                </div>
                {this.props.me.changePasswordError && <Snackbar
                    open={true}
                    message="Changement du mot de passe échoué."
                    autoHideDuration={4000}/>}
            </Paper>
        )
    }
}

export default ChangePassword;