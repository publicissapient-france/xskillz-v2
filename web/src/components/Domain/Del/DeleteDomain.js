import React, { Component, PropTypes } from "react";
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import _ from 'lodash';
import { Snackbar } from 'material-ui'

class DeleteDomain extends Component {

    static propTypes = {
        domains: PropTypes.object.isRequired,
        deleteDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { name: null, domainId: null, submit: false, snackOpen: false };
    }

    changeDomain = (event, index, value) => {
        if (index >= 0) {
            return this.setState({ domainId: value, name: this.props.domains.list[index].name });
        }
    };

    deleteDomain = (name, index) => {
        this.setState({ submit: true, snackOpen: false });
        return this.props.deleteDomain(this.state.domainId);
    };

    onSnackClose = () => this.setState({ snackOpen: false, submit: false });

    render() {
        const { submit, domainId } = this.state;
        const domainList = this.props.domains.list;
        const domainRemoved = this.props.domains.domainRemoved;
        const snackOpen = !!(submit && domainRemoved);
        return (
            <Paper style={{ margin: '.2rem', padding: '1rem' }}>
                <h3>Supprimer un domaine</h3>
                <div>
                    <SelectField floatingLabelText="Domaine" value={domainId}
                                 hintText="Choisir un domaine"
                                 onChange={::this.changeDomain}>
                        {domainList.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                     primaryText={domain.name} />)}
                    </SelectField>
                    <div style={{ marginTop: '1rem' }}>
                        <RaisedButton
                            label="Supprimer"
                            primary={true}
                            onClick={::this.deleteDomain}
                            disabled={_.isNull(domainId)} />
                    </div>
                </div>
                <Snackbar
                    bodyStyle={{ backgroundColor: '#008500' }}
                    open={snackOpen}
                    message={`Domaine ${this.state.name} supprimé.`}
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000} />
            </Paper>
        )
    }
}

export default DeleteDomain;