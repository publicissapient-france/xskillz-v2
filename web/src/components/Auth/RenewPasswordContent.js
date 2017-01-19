import React, {Component, PropTypes} from "react";
import {Link} from 'react-router';

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Card from "material-ui/Card";
import Snackbar from "material-ui/Snackbar";

import "./PasswordContent.less";

class RenewPasswordContent extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {email: '', sent: false};
    }

    onEmailChanged = event => {
        this.setState({email: event.target.value});
    };

    notifyPasswordChange = event => {
        event.preventDefault();
        const {email} = this.state;
        if (email) {
            this.props.notifyPasswordChange(email);
            this.setState({sent: true});
        }
    };

    closeSnackbar = () => this.setState({sent: false});

    render() {

        const style = {
            card: {padding: '4rem 1rem 3rem 1rem'},
            button: {width: '10rem', margin: 'auto'},
            input: {display: 'none'}
        };

        const {email, sent} = this.state;

        const {success, error} = this.props.auth.notifyPassword;

        return (
            <div>
                <form className="password-renew" onSubmit={::this.notifyPasswordChange}>
                    <Card style={style.card}>
                        <img src="/images/logo.png" width={200} alt="logo skillz"/>
                        <div>
                            <TextField fullWidth floatingLabelText="Email"
                                       onChange={::this.onEmailChanged}
                                       value={email}/>
                        </div>
                        <div className="cta" onClick={::this.notifyPasswordChange}>
                            <RaisedButton primary style={style.button} label="Réinitialiser"/>
                            <input type="submit" style={style.input}/>
                        </div>
                        <div>
                            <Link to={'/signin'}>
                                <FlatButton style={{marginTop: '10px'}}
                                            label="Se connecter" primary/>
                            </Link>
                        </div>
                        <div>
                            <Link to={'/signup'}>
                                <FlatButton label="S'inscrire" primary/>
                            </Link>
                        </div>
                    </Card>
                </form>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={!!(sent && success)}
                    message={`Demande d'initialisation envoyée.`}
                    autoHideDuration={3000}
                    onRequestClose={this.closeSnackbar}/>
                <Snackbar
                    bodyStyle={{backgroundColor: '#FF0000'}}
                    open={!!(sent && error)}
                    message={`Vérifiez l'email et/ou le réseau.`}
                    autoHideDuration={3000}
                    onRequestClose={this.closeSnackbar}/>
            </div>
        )
    }

}

export default RenewPasswordContent;