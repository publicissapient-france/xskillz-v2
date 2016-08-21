import React, {Component, PropTypes} from "react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddDomain extends Component {

    static propTypes = {
        addDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {name: null, color: null};
    }

    setName = event => this.setState({name: event.currentTarget.value});

    setColor = event => this.setState({color: event.currentTarget.value});

    addDomain = () => this.props.addDomain({name: this.state.name, color: this.state.color});

    render() {
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Ajouter un domaine</h3>
                <div>
                    <TextField floatingLabelText="Domaine" onBlur={::this.setName}/>
                    <TextField floatingLabelText="Couleur préfixée par #" onBlur={::this.setColor}/>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Ajouter" primary={true} onClick={::this.addDomain}/>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default AddDomain;