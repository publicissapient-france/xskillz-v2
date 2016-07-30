import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card'
import './SignupContent.less';
import Snackbar from 'material-ui/Snackbar';

class SignupContent extends Component {

    static propTypes = {
        signup: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: ''};
    }

    onEmailChanged = event => this.setState({email: event.target.value});

    onPasswordChanged = event => this.setState({password: event.target.value});

    onNameChanged = event => this.setState({name: event.target.value});

    signup = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        this.props.signup(name, email, password);
    };

    render() {

        const style = {
            card: {padding: '4rem 1rem 3rem 1rem'},
            button: {width: '10rem', margin: 'auto'},
            input: {display: 'none'}
        };

        const { name, email, password } = this.state;

        return (
            <form className="signup" onSubmit={::this.signup}>
                <Card style={style.card}>
                    <img src="/images/logo.png" width={200} alt="logo skillz"/>
                    <div>
                        <TextField fullWidth floatingLabelText="Nom" onChange={::this.onNameChanged} value={name}/>
                    </div>
                    <div>
                        <TextField fullWidth floatingLabelText="Email" onChange={::this.onEmailChanged} value={email}/>
                    </div>
                    <div>
                        <TextField fullWidth floatingLabelText="Mot de passe" onChange={::this.onPasswordChanged}
                                   value={password} type="password"/>
                    </div>
                    <div className="cta" onClick={::this.signup}>
                        <RaisedButton primary style={style.button} label="Se connecter"/>
                        <input type="submit" style={style.input}/>
                    </div>
                </Card>
            </form>
        )
    }

}

export default SignupContent;