import React, {Component, PropTypes} from "react";
import {Link} from 'react-router';

import {API_SIGNIN_ERROR} from "../../actions/auth";

import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import Snackbar from "material-ui/Snackbar";

import "./SigninContent.less";

class SigninContent extends Component {

    static propTypes = {
        signin: PropTypes.func.isRequired,
        goToSignup: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: false};
    }

    onEmailChanged = event => {
        this.setState({email: event.target.value});
    };

    onPasswordChanged = (event) => {
        this.setState({password: event.target.value, error: false});
    };

    signin = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        this.props.signin(email, password).then((response) => {
            if (response) {
                this.setState({error: response.type === API_SIGNIN_ERROR});
            }
        });
    };

    render() {

        const style = {
            card: {padding: '4rem 1rem 3rem 1rem'},
            button: {width: '10rem', margin: 'auto'},
            input: {display: 'none'}
        };

        const {email, password} = this.state;

        return (
            <div>
                <form className="signin" onSubmit={::this.signin}>
                    <Card style={style.card}>
                        <img src="/images/logo.png" width={200} alt="logo skillz"/>
                        <div>
                            <TextField fullWidth floatingLabelText="Email" onChange={::this.onEmailChanged}
                                       value={email}/>
                        </div>
                        <div>
                            <TextField fullWidth floatingLabelText="Mot de passe" onChange={::this.onPasswordChanged}
                                       value={password} type="password"/>
                        </div>
                        <div className="cta" onClick={::this.signin}>
                            <RaisedButton primary style={style.button} label="Se connecter"/>
                            <input type="submit" style={style.input}/>
                        </div>
                        <Link to={'/signup'}>
                            <FlatButton style={{marginTop: '10px'}}
                                        label="S'inscrire" primary/>
                        </Link>
                    </Card>
                </form>
                <Snackbar
                    bodyStyle={{backgroundColor: '#FF0000'}}
                    open={this.state.error}
                    message={`Mot de passe incorrect`}
                    autoHideDuration={3000}/>
            </div>
        )
    }

}

export default SigninContent;