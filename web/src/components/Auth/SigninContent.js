import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card'
import './SigninContent.less';
import { browserHistory } from 'react-router';

class SigninContent extends Component {

    static propTypes = {
        signin: PropTypes.func.isRequired,
        goToSignup: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    onEmailChanged = event => {
        this.setState({email: event.target.value});
    };

    onPasswordChanged = (event) => {
        this.setState({password: event.target.value});
    };

    signin = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.signin(email, password);
    };

    goToSignUp = (event) => {
        browserHistory.push('/signup')
    };

    render() {

        const style = {
            card: {padding: '4rem 1rem 3rem 1rem'},
            button: {width: '10rem', margin: 'auto'},
            input: {display: 'none'}
        };

        const {email, password} = this.state;
        const {goToSignup} = this.props;

        return (
            <div>
            <form className="signin" onSubmit={::this.signin}>
                <Card style={style.card}>
                    <img src="/images/logo.png" width={200} alt="logo skillz"/>
                    <div>
                        <TextField fullWidth floatingLabelText="Email" onChange={::this.onEmailChanged} value={email}/>
                    </div>
                    <div>
                        <TextField fullWidth floatingLabelText="Mot de passe" onChange={::this.onPasswordChanged}
                                   value={password} type="password" />
                    </div>
                    <div className="cta" onClick={::this.signin}>
                        <RaisedButton primary style={style.button} label="Se connecter"/>
                        <input type="submit" style={style.input}/>
                    </div>
                </Card>
            </form>
            </div>
        )
    }

}

export default SigninContent;