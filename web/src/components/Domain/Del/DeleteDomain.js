import React, {Component, PropTypes} from "react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

class DeleteDomain extends Component {

    static propTypes = {
        domains: PropTypes.array.isRequired,
        deleteDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {domainId: null};
    }

    changeDomain = (event, index, value) => this.setState({domainId: value});

    deleteDomain = () => this.props.deleteDomain(this.state.domainId);

    render() {
        const {domains} = this.props;
        const {domainId} = this.state;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Supprimer un domaine</h3>
                <div>
                    <SelectField floatingLabelText="Domaine" value={domainId}
                                 hintText="Choisir un domaine"
                                 onChange={::this.changeDomain}>
                        {domains.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                  primaryText={domain.name}/>)}
                    </SelectField>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Supprimer" primary={true} onClick={::this.deleteDomain}/>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default DeleteDomain;