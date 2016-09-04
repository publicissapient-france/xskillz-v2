import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import _ from 'lodash';

class PromoteManager extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {userId: null};
    }

    onUserChange = (event, index, value) => index >= 0 && this.setState({userId: this.props.users.list[index].id});

    promoteManager = () => this.props.promoteManager(this.state.userId);

    render() {
        const users = this.props.users.list;
        let userNames = [];
        if (users) {
            userNames = _.flatMap(users, user => user.name);
        }
        const {userId} = this.state;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Promouvoir un manageur</h3>
                <div>
                    <AutoComplete
                        floatingLabelText="Équipier"
                        hintText="Chercher un équipier"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={userNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onUserChange}/>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Promouvoir" primary={true} onClick={::this.promoteManager}/>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default PromoteManager;