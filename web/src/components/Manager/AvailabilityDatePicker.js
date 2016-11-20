import React, {Component, PropTypes} from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import areIntlLocalesSupported from 'intl-locales-supported';
import _ from 'lodash';

class AvailabilityDatePicker extends Component {

    static propTypes = {
        saveAvailabilityDate: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {date: null, userId: null};
    }

    onChangeDate = (event, date) => this.setState({date});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    onUserChange = (name, index) => index >= 0 && this.setState({userId: this.props.users.list[index].id});

    saveAvailabilityDate = () => this.props.saveAvailabilityDate(this.state.userId, this.state.date);

    render() {
        let DateTimeFormat;
        // Use the native Intl.DateTimeFormat if available, or a polyfill if not.
        if (areIntlLocalesSupported(['fr'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        } else {
            const IntlPolyfill = require('intl');
            DateTimeFormat = IntlPolyfill.DateTimeFormat;
            require('intl/locale-data/jsonp/fr');
        }
        const {date} = this.state;
        const users = this.props.users.list;
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
                    <RaisedButton label="Valider" primary={true} onClick={::this.saveAvailabilityDate}/>
                </div>
            </Paper>
        )
    }
}

export default AvailabilityDatePicker;