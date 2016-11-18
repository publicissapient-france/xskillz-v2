import React, {Component, PropTypes} from "react";

import isEmail from "validator/lib/isEmail";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import Snackbar from "material-ui/Snackbar";
import {API_SIGNIN_ERROR} from "../../actions/auth";

import './SignupContent.less';

class SigninContent extends Component {

    static propTypes = {
        signup: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {email: '', firstname: '', lastname: '', password: ''};
    }

    onEmailChange = event => this.setState({email: event.target.value});

    onFirstnameChange = event => this.setState({firstname: event.target.value});

    onLastnameChange = event => this.setState({lastname: event.target.value});

    onPasswordChange = event => this.setState({password: event.target.value});


    signup = event => {
        event.preventDefault();
        const {email, firstname, lastname, password} = this.state;
        let error = false;
        if (!isEmail(email)) {
            this.setState({eError: true});
            error = true;
        }
        if (firstname.length <= 1) {
            this.setState({fnError: true});
            error = true;
        }
        if (lastname.length <= 1) {
            this.setState({lnError: true});
            error = true;
        }
        if (password.length <= 3) {
            this.setState({pError: true});
            error = true;
        }
        if (error) {
            return;
        }
        this.props.signup(email, `${firstname} ${lastname}`, password);
    };

    render() {

        const style = {
            card: {padding: '4rem 1rem 3rem 1rem'},
            button: {width: '10rem', margin: 'auto'},
            input: {display: 'none'}
        };

        const {email, firstname, lastname, password, eError, fnError, lnError, pError} = this.state;

        return (
            <div>
                <form className="signup" onSubmit={::this.signup}>
                    <Card style={style.card}>
                        <img src="/images/logo.png" width={200} alt="logo skillz"/>
                        <div>
                            <TextField fullWidth floatingLabelText="Prénom"
                                       onChange={::this.onFirstnameChange}
                                       value={firstname}
                                       name="firstname"
                                       errorText={fnError ? 'Le prénom doit faire plus d\'une lettre.' : ''}
                                       errorStyle={{textAlign: 'left'}}/>
                        </div>
                        <div>
                            <TextField fullWidth floatingLabelText="Nom"
                                       onChange={::this.onLastnameChange}
                                       value={lastname}
                                       name="lastname"
                                       errorText={lnError ? 'Le nom doit faire plus d\'une lettre.' : ''}
                                       errorStyle={{textAlign: 'left'}}/>
                        </div>
                        <div>
                            <TextField fullWidth
                                       floatingLabelText="Email"
                                       onChange={::this.onEmailChange}
                                       value={email}
                                       name="email"
                                       errorText={eError ? 'L\'email doit doit être valide.' : ''}
                                       errorStyle={{textAlign: 'left'}}/>
                        </div>
                        <div>
                            <TextField fullWidth
                                       floatingLabelText="Mot de passe"
                                       onChange={::this.onPasswordChange}
                                       value={password}
                                       type="password"
                                       name="password"
                                       errorText={pError ? 'Le mot de passe doit doit faire plus de 3 lettres.' : ''}
                                       errorStyle={{textAlign: 'left'}}/>
                        </div>
                        <div className="cta" onClick={::this.signup}>
                            <RaisedButton primary style={style.button} label="S'inscrire"/>
                            <input type="submit" style={style.input}/>
                        </div>
                    </Card>
                </form>
                {/*<Snackbar*/}
                {/*bodyStyle={{backgroundColor: '#FF0000'}}*/}
                {/*open={this.state.error}*/}
                {/*message={`Mot de passe incorrect`}*/}
                {/*autoHideDuration={3000}/>*/}
            </div>
        )
    }

}

export default SigninContent;