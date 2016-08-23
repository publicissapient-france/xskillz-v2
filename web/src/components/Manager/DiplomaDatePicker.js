import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

class DiplomaDatePicker extends Component {

    static propTypes = {
        saveDiploma: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {date: null, userId: null};
    }

    onChangeDate = (event, date) => this.setState({date});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    onUserChange = (event, index, value) => this.setState({userId: value});

    saveDiploma = () => this.props.saveDiploma(this.state.userId, this.state.date);

    render() {
        const {userId, date} = this.state;
        const users = this.props.users.list;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Graduation date</h3>
                <div>
                    <SelectField floatingLabelText="Name" value={userId} hintText="Choose a teammate"
                                 onChange={::this.onUserChange}>
                        {users.map((user, index) => <MenuItem value={user.id} key={index} primaryText={user.name}/>)}
                    </SelectField>
                </div>
                <div>
                    <DatePicker
                        hintText="Graduated on"
                        value={date}
                        onChange={::this.onChangeDate}
                        shouldDisableDate={this.disableWeekends}/>
                </div>
                <div style={{marginTop: '1rem'}}>
                    <RaisedButton label="Save" primary={true} onClick={::this.saveDiploma}/>
                </div>
            </Paper>
        )
    }
}

export default DiplomaDatePicker;