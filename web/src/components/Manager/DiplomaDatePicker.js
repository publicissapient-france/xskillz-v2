import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton'

class DiplomaDatePicker extends Component {

    static propTypes = {
        saveDiploma: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {date: null};
    }

    onChangeDate = (event, date) => this.setState({date});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    saveDiploma = () => this.props.saveDiploma(this.state.date);

    render() {
        const date = this.state.date;
        return (
            <div className="graduation">
                <h2>Graduation date</h2>
                <div>
                    <DatePicker
                        hintText="Graduated on"
                        value={date}
                        onChange={::this.onChangeDate}
                        shouldDisableDate={this.disableWeekends}/>
                </div>
                <div>
                    <RaisedButton label="Save" primary={true} onClick={::this.saveDiploma}/>
                </div>
            </div>
        )
    }
}

export default DiplomaDatePicker;