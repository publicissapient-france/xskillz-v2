import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import _ from 'lodash';

class EmployeeDatePicker extends Component {

    static propTypes = {
        saveEmployeeDate: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {date: null, userId: null};
    }

    onChangeDate = (event, date) => this.setState({date});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    onUserChange = (name, index) => index >= 0 && this.setState({userId: this.props.users.list[index].id});

    saveEmployeeDate = () => this.props.saveEmployeeDate(this.state.userId, this.state.date);

    render() {
        const {date, userId} = this.state;
        const users = this.props.users.list;
        let userNames = [];
        if (users) {
            userNames = _.flatMap(users, user => user.name);
        }
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Définir la date de démarrage dans la société</h3>
                <div>
                    <AutoComplete
                        floatingLabelText="Équipier"
                        hintText="Chercher un équipier"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={userNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onUserChange}/>
                </div>
                <div>
                    <DatePicker
                        hintText="Embauché le"
                        value={date}
                        onChange={::this.onChangeDate}
                        shouldDisableDate={this.disableWeekends}/>
                </div>
                <div style={{marginTop: '1rem', clear: 'both'}}>
                    <RaisedButton
                      label="Valider"
                      primary={true}
                      onClick={::this.saveEmployeeDate}
                      disabled={_.isNull(userId) || _.isNull(date)}/>
                </div>
            </Paper>
        )
    }
}

export default EmployeeDatePicker;