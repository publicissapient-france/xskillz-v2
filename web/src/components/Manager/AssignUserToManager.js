import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import Snackbar from "material-ui/Snackbar";

class AssignUserToManager extends Component {

    static propTypes = {
        assignUserToManager: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired,
        fetchUsers: PropTypes.func.isRequired,
        fetchManagers: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { userId: null, managerId: null, submit: false, snackOpen: false };
    }

    componentDidMount() {
        if (_.isEmpty(this.props.users.managers)) {
            this.props.fetchManagers();
        }
    }

    onUserChange = (name, index) => {
        if (index >= 0) {
            this.setState({ userId: this.props.users.list[index].id, userName: this.props.users.list[index].name })
        }
    };

    onManagerChange = (event, index, value) => {
        if (index >= 0) {
            this.setState({ managerId: value, managerName: this.props.users.managers[index].name });
        }
    };

    assignUserToManager = () => {
        this.setState({ submit: true, snackOpen: false });
        this.props.assignUserToManager(this.state.userId, this.state.managerId);
    };

    onSnackClose = () => this.setState({ snackOpen: false, submit: false });

    render() {
        const { managerId, userId } = this.state;
        const users = this.props.users.list;
        console.log(this.props.users);
        const userAssigned = this.props.users.userAssigned;
        let { submit } = this.state;
        const snackOpen = !!(submit && userAssigned);
        let userNames = [];
        if (users) {
            userNames = _.flatMap(users, user => user.name);
        }
        const managers = this.props.users.managers;
        return (
            <Paper style={{ margin: '.2rem', padding: '1rem' }}>
                <h3>Assigner un équipier à un manageur</h3>
                <div style={{ float: 'left' }}>
                    <AutoComplete
                        floatingLabelText="Équipier"
                        hintText="Chercher un équipier"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={userNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onUserChange} />
                </div>
                <div>
                    <SelectField floatingLabelText="Manageur" value={managerId} hintText="Choisir un manageur"
                                 onChange={::this.onManagerChange}>
                        {managers.map((manager, index) => <MenuItem value={manager.id} key={index}
                                                                    primaryText={manager.name} />)}
                    </SelectField>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <RaisedButton
                        label="Valider"
                        primary={true}
                        onClick={::this.assignUserToManager}
                        disabled={_.isNull(userId) || _.isNull(managerId)} />
                </div>
                <Snackbar
                    bodyStyle={{ backgroundColor: '#008500' }}
                    open={snackOpen}
                    message={`${this.state.userName} assigné(e) à ${this.state.managerName}.`}
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000} />
            </Paper>
        )
    }
}

export default AssignUserToManager;