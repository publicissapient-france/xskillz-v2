import React, {Component, PropTypes} from "react";
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class ChangePassword extends Component {

    static propTypes = {
        changePassword: PropTypes.func.isRequired,
        me: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {oldPassword: '', password: ''};
    }

    setOldPassword = event => this.setState({oldPassword: event.currentTarget.value});

    setPassword = event => this.setState({password: event.currentTarget.value});

    changePassword = event => {
        event.preventDefault();
        this.setState({submit: true});
        this.props.changePassword(this.state.oldPassword, this.state.password);
    };

    revertSubmit = () => _.delay(() => this.setState({submit: false}), 200);

    render() {
        const {me:{changePassword}} = this.props;
        const {submit} = this.state;
        const hideDuration = 3000;
        const successOpen = (submit && changePassword.success) || false;
        const errorOpen = (submit && changePassword.error) || false;
        return (
            <Paper style={{margin: '.5em', padding: '10px'}}>
                <h3>Changer de mot de passe</h3>
                <form>
                    <TextField
                        floatingLabelText="Ancien mot de passe"
                        onChange={::this.setOldPassword}
                        type="password"/>
                    <TextField
                        floatingLabelText="Nouveau mot de passe"
                        onChange={::this.setPassword}
                        type="password"/>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Changer" primary={true} onClick={::this.changePassword}/>
                    </div>
                </form>
                <Snackbar
                    bodyStyle={{backgroundColor: '#CC0000'}}
                    open={errorOpen}
                    message="Changement de mot de passe échoué."
                    autoHideDuration={hideDuration}
                    onRequestClose={::this.revertSubmit}/>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={successOpen}
                    message="Mot de passe changé."
                    autoHideDuration={hideDuration}
                    onRequestClose={::this.revertSubmit}/>
            </Paper>
        )
    }
}

export default ChangePassword;