import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import {Paper, RaisedButton, DatePicker, Snackbar, AutoComplete} from 'material-ui'

class EmployeeEndDatePicker extends Component {

    static propTypes = {
        saveEmployeeEndDate: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {date: null, userId: null};
    }

    onChangeDate = (event, date) => this.setState({date});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    onUserChange = (name, index) => index >= 0 && this.setState({userId: this.props.users.list[index].id});

    saveEmployeeEndDate = () => {
        this.setState({snackOpen: false, submit: true});
        return this.props.saveEmployeeEndDate(this.state.userId, this.state.date);
    };

    onSnackClose = () => {
        this.setState({snackOpen: false, submit: false});
    };

    render() {
        let {date, userId, submit, snackOpen} = this.state;
        const users = this.props.users.list;
        const employeeEndDateSaved = this.props.users.employeeEndDateSaved;
        snackOpen = !!(submit && employeeEndDateSaved);
        let userNames = [];
        if (users) {
            userNames = _.flatMap(users, user => user.name);
        }
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Définir la date de fin de contrat</h3>
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
                        hintText="Fin de contrat le"
                        value={date}
                        onChange={::this.onChangeDate}
                        shouldDisableDate={this.disableWeekends}/>
                </div>
                <div style={{marginTop: '1rem', clear: 'both'}}>
                    <RaisedButton
                      label="Valider"
                      primary={true}
                      onClick={::this.saveEmployeeEndDate}
                      disabled={_.isNull(userId) || _.isNull(date)}/>
                </div>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={snackOpen}
                    message="Date de fin de contrat mise à jour"
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000}/>
            </Paper>
        )
    }
}

export default EmployeeEndDatePicker;