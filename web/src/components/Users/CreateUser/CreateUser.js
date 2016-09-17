import React, {Component, PropTypes} from "react";

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';

class CreateUser extends Component {

    static propTypes = {
        createUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {name: null, email: null, password: null};
    }

    setName = event => this.setState({name: event.currentTarget.value});

    setEmail = event => this.setState({email: event.currentTarget.value});

    setPassword = event => this.setState({password: event.currentTarget.value});

    createUser = () => this.props.createUser(this.state.name, this.state.email, this.state.password);

    render() {
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Créer un utilisateur</h3>
                <div>
                    <div>
                        <TextField floatingLabelText="Nom" onBlur={::this.setName}/>
                    </div>
                    <div>
                        <TextField floatingLabelText="Email" onBlur={::this.setEmail}/>
                    </div>
                    <div>
                        <TextField floatingLabelText="Mot de passe" onBlur={::this.setPassword} type="password"/>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Créer" primary={true} onClick={::this.createUser}/>
                    </div>
                </div>
                {this.props.auth.createUserError && <Snackbar
                    open={true}
                    message="Création de l'utilisateur échouée."
                    autoHideDuration={4000}/>}
            </Paper>
        )
    }
}

export default CreateUser;