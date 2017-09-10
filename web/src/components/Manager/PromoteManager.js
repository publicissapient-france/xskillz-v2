import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import _ from 'lodash';
import Snackbar from "material-ui/Snackbar";

class PromoteManager extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { userId: null, submit: false, snackOpen: false };
    }

    onUserChange = (event, index, value) => {
        if (index >= 0) {
            this.setState({ userId: this.props.users.list[index].id, userName: this.props.users.list[index].name });
        }
    };

    promoteManager = () => {
        this.setState({ submit: true, snackOpen: false });
        this.props.promoteManager(this.state.userId);
    };

    onSnackClose = () => this.setState({ snackOpen: false, submit: false });

    render() {
        const users = this.props.users.list;
        let userNames = [];
        if (users) {
            userNames = _.flatMap(users, user => user.name);
        }
        const managerPromoted = this.props.users.managerPromoted;
        let { submit } = this.state;
        const snackOpen = !!(submit && managerPromoted);

        const { userId } = this.state;
        return (
            <Paper style={{ margin: '.2rem', padding: '1rem' }}>
                <h3>Promouvoir un manageur</h3>
                <div>
                    <AutoComplete
                        floatingLabelText="Équipier"
                        hintText="Chercher un équipier"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={userNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onUserChange} />
                    <div style={{ marginTop: '1rem' }}>
                        <RaisedButton
                            label="Promouvoir"
                            primary={true}
                            onClick={::this.promoteManager}
                            disabled={_.isNull(userId)} />
                    </div>
                </div>
                <Snackbar
                    bodyStyle={{ backgroundColor: '#008500' }}
                    open={snackOpen}
                    message={`${this.state.userName} a été promu(e) manageur.`}
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000} />
            </Paper>
        );
    }
}

export default PromoteManager;