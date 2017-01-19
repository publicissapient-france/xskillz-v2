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
        this.state = {password: '', sent: false};
    }

    onPasswordChanged = event => {
        this.setState({password: event.target.value});
    };

    changePassword = event => {
        event.preventDefault();
        const {password} = this.state;
        const {t, id} = this.props.location.query;
        if (password) {
            this.props.changePassword(id, t, password);
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

        const {password, sent} = this.state;

        const {success, error} = this.props.auth.changePassword;

        return (
            <div>
                <form className="password-renew" onSubmit={::this.changePassword}>
                    <Card style={style.card}>
                        <img src="/images/logo.png" width={200} alt="logo skillz"/>
                        <div>
                            <TextField fullWidth floatingLabelText="Mot de passe"
                                       onChange={::this.onPasswordChanged}
                                       type="password"
                                       value={password}/>
                        </div>
                        <div className="cta" onClick={::this.changePassword}>
                            <RaisedButton primary style={style.button} label="Sauvegarder"/>
                            <input type="submit" style={style.input}/>
                        </div>
                        <div>
                            <Link to={'/signin'}>
                                <FlatButton style={{marginTop: '10px'}}
                                            label="Se connecter" primary/>
                            </Link>
                        </div>
                    </Card>
                </form>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={!!(sent && success)}
                    message={`Mot de passe changé.`}
                    autoHideDuration={3000}
                    onRequestClose={this.closeSnackbar}/>
                <Snackbar
                    bodyStyle={{backgroundColor: '#FF0000'}}
                    open={!!(sent && error)}
                    message={`Token inconnu, veuillez essayer à nouveau et/ou vérifier le réseau.`}
                    autoHideDuration={3000}
                    onRequestClose={this.closeSnackbar}/>
            </div>
        )
    }

}

export default RenewPasswordContent;