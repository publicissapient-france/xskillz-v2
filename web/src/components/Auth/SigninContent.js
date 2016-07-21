import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card'
import './SigninContent.less';
import Snackbar from 'material-ui/Snackbar';

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

    render() {

        const style = {
            card: {padding: '4rem 1rem 3rem 1rem'},
            button: {width: '10rem', margin: 'auto'},
            input: {display: 'none'}
        };

        const {email, password} = this.state;
        const {goToSignup} = this.props;

        return (
            <form className="signin" onSubmit={::this.signin}>
                <Card style={style.card}>
                    <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97200&w=200&h=200"
                         alt="logo skillz"/>
                    <div>
                        <TextField fullWidth floatingLabelText="Email" onChange={::this.onEmailChanged} value={email}/>
                    </div>
                    <div>
                        <TextField fullWidth floatingLabelText="Password" onChange={::this.onPasswordChanged}
                                   value={password}/>
                    </div>
                    <div className="cta" onClick={::this.signin}>
                        <RaisedButton primary style={style.button} label="Signin"/>
                        <input type="submit" style={style.input}/>
                    </div>
                    <div className="cta" onClick={goToSignup}>
                        <RaisedButton secondary style={style.button} label="New user?"/>
                    </div>
                </Card>
            </form>
        )
    }

}

export default SigninContent;