import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {Paper, RaisedButton, DatePicker, Snackbar, AutoComplete} from 'material-ui'
import moment from 'moment';

import DateTimeFormat from '../../tools/date';

class AvailabilityDatePicker extends Component {

    static propTypes = {
        saveAvailabilityDate: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {date: null, userId: null, submit: false, snackOpen: false};
    }

    onChangeDate = (event, date) => this.setState({date});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    onUserChange = (name, index) => index >= 0 && this.setState({userId: this.props.users.list[index].id});

    saveAvailabilityDate = () => {
        this.setState({snackOpen: false, submit: true});
        return this.props.saveAvailabilityDate(this.state.userId, moment(this.state.date).format('YYYY-MM-DD'));
    };

    onSnackClose = () => {
        this.setState({snackOpen: false, submit: false});
    };

    render() {
        let {date, userId, submit, snackOpen} = this.state;
        const users = this.props.users.list;
        const availabilityDateSaved = this.props.users.employeeAvailabilityDateSaved;
        if (submit && availabilityDateSaved) {
            snackOpen = true;
        }
        let userNames = [];
        if (users) {
            userNames = _.flatMap(users, user => user.name);
        }
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Définir la date de disponibilité</h3>
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
                        DateTimeFormat={DateTimeFormat}
                        hintText="Disponible le"
                        floatingLabelText="Disponible le"
                        value={date}
                        onChange={::this.onChangeDate}
                        minDate={new Date()}
                        shouldDisableDate={this.disableWeekends}
                        locale="fr"/>
                </div>
                <div style={{marginTop: '1rem', clear: 'both'}}>
                    <RaisedButton
                      label="Valider"
                      primary={true}
                      onClick={::this.saveAvailabilityDate}
                      disabled={_.isNull(userId) || _.isNull(date)}/>
                </div>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={snackOpen}
                    message="Date de disponibilité mise à jour"
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000}/>
            </Paper>
        )
    }
}

export default AvailabilityDatePicker;