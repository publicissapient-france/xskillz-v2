import React, { Component, PropTypes } from "react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import { Snackbar } from 'material-ui'

class AddDomain extends Component {

    static propTypes = {
        addDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { name: null, color: null, submit: false, snackOpen: false };
    }

    setName = event => this.setState({ name: event.currentTarget.value });

    setColor = event => this.setState({ color: event.currentTarget.value });

    addDomain = () => {
        this.setState({ submit: true, snackOpen: false });
        this.props.addDomain({ name: this.state.name, color: this.state.color });
    };

    onSnackClose = () => this.setState({ snackOpen: false, submit: false });

    render() {
        let { submit } = this.state;
        const { domainAdded } = this.props.domains;
        const snackOpen = !!(submit && domainAdded);
        return (
            <Paper style={{ margin: '.2rem', padding: '1rem' }}>
                <h3>Ajouter un domaine</h3>
                <div>
                    <TextField floatingLabelText="Domaine" onChange={::this.setName} />
                    <TextField floatingLabelText="Couleur préfixée par #" defaultValue="#" onChange={::this.setColor} />
                    <div style={{ marginTop: '1rem' }}>
                        <RaisedButton
                            label="Ajouter"
                            primary={true}
                            onClick={::this.addDomain}
                            disabled={_.isEmpty(this.state.name)} />
                    </div>
                </div>
                <Snackbar
                    bodyStyle={{ backgroundColor: '#008500' }}
                    open={snackOpen}
                    message={`Domaine ${this.state.name} ajouté.`}
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000} />
            </Paper>
        )
    }
}

export default AddDomain;