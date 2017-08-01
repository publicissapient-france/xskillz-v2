import React, {Component, PropTypes} from "react";

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';
import _ from 'lodash';

class CreateUser extends Component {

    static propTypes = {
        createUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {name: null, email: null, password: null, submit: false};
    }

    setName = event => this.setState({name: event.currentTarget.value});

    setEmail = event => this.setState({email: event.currentTarget.value});

    setPassword = event => this.setState({password: event.currentTarget.value});

    createUser = () => {
        this.setState({submit: true});
        return this.props.createUser(this.state.name, this.state.email, this.state.password);
    };

    render() {
        const {name, email, password} = this.state;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Créer un utilisateur</h3>
                <div>
                    <div>
                        <TextField floatingLabelText="Prénom Nom" onBlur={::this.setName}/>
                    </div>
                    <div>
                        <TextField floatingLabelText="Email" onBlur={::this.setEmail}/>
                    </div>
                    <div>
                        <TextField floatingLabelText="Mot de passe" onBlur={::this.setPassword} type="password"/>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton
                          label="Créer"
                          primary={true}
                          onClick={::this.createUser}
                          disabled={_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(password)}/>
                    </div>
                </div>
                <Snackbar
                    bodyStyle={{backgroundColor: '#CC0000'}}
                    open={this.state.submit && this.props.auth.createUser.error}
                    message={`Création de l'utilisateur ${this.state.name || ''} échoué.`}
                    autoHideDuration={3000}/>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={this.state.submit && this.props.auth.createUser.success}
                    message={`Utilisateur ${this.state.name} créé.`}
                    autoHideDuration={3000}/>
            </Paper>
        )
    }
}

export default CreateUser;