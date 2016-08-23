import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';

class PromoteManager extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {userId: null};
    }

    onUserChange = (event, index, value) => this.setState({userId: value});

    promoteManager = () => this.props.promoteManager(this.state.userId);

    render() {
        const users = this.props.users.list;
        const {userId} = this.state;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Promouvoir un manageur</h3>
                <div>
                    <SelectField floatingLabelText="Utilisateur" value={userId} hintText="Choisir un utilisateur"
                                 onChange={::this.onUserChange}>
                        {users.map((user, index) => <MenuItem value={user.id} key={index}
                                                              primaryText={user.name}/>)}
                    </SelectField>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Promouvoir" primary={true} onClick={::this.promoteManager}/>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default PromoteManager;