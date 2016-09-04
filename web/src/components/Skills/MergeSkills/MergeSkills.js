import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';

class MergeSkills extends Component {

    static propTypes = {
        skills: PropTypes.array.isRequired,
        mergeSkills: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {fromId: null, toId: null};
    }

    mergeSkills = () => this.props.mergeSkills({from: this.state.fromId, to: this.state.toId});

    onFromNewRequest = (name, index) => index >= 0 && this.setState({fromId: this.props.skills[index].id});

    onToNewRequest = (name, index) => index >= 0 && this.setState({toId: this.props.skills[index].id});

    render() {
        const {skills} = this.props;
        let skillNames = [];
        if (skills) {
            skillNames = _.flatMap(skills, skill => skill.name);
        }
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Fusionner deux compétences</h3>
                <div style={{float:'left'}}>
                    <AutoComplete
                        floatingLabelText="Remplacer la compétence"
                        hintText="Chercher la compétence"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={skillNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onFromNewRequest}/>
                </div>
                <div>
                    <AutoComplete
                        floatingLabelText="Par"
                        hintText="Chercher la compétence"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={skillNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onToNewRequest}/>
                </div>
                <div style={{marginTop: '1rem'}}>
                    <RaisedButton label="Valider" primary={true} onClick={::this.mergeSkills}/>
                </div>
            </Paper>
        );
    }
}

export default MergeSkills;