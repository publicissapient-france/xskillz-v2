import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import Paper from 'material-ui/Paper';

class AssignUserToManager extends Component {

    static propTypes = {
        assignUserToManager: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired,
        fetchUsers: PropTypes.func.isRequired,
        fetchManagers: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {userId: null, managerId: null};
    }

    componentDidMount() {
        if (_.isEmpty(this.props.users.managers)) {
            this.props.fetchManagers();
        }
    }

    onUserChange = (event, index, value) => this.setState({userId: value});

    onManagerChange = (event, index, value) => this.setState({managerId: value});

    assignUserToManager = () => this.props.assignUserToManager(this.state.userId, this.state.managerId);

    render() {
        const { userId, managerId } = this.state;
        const users = this.props.users.list;
        const managers = this.props.users.managers;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Assigner un manageur</h3>
                <div>
                    <SelectField floatingLabelText="Utilisateur" value={userId} hintText="Choisir un utilisateur"
                                 onChange={::this.onUserChange}>
                        {users.map((user, index) => <MenuItem value={user.id} key={index}
                                                              primaryText={user.name}/>)}
                    </SelectField>
                    <SelectField floatingLabelText="Manageur" value={managerId} hintText="Choisir un manageur"
                                 onChange={::this.onManagerChange}>
                        {managers.map((manager, index) => <MenuItem value={manager.id} key={index}
                                                                    primaryText={manager.name}/>)}
                    </SelectField>
                </div>
                <div style={{marginTop: '1rem'}}>
                    <RaisedButton label="Valider" primary={true} onClick={::this.assignUserToManager}/>
                </div>
            </Paper>
        )
    }
}

export default AssignUserToManager;