import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

class MergeSkills extends Component {

    static propTypes = {
        skills: PropTypes.array.isRequired,
        mergeSkills: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {fromId: null, toId: null};
    }

    mergeSkills = () => this.props.mergeSkills({from: this.state.mergeFromSkillId, to: this.state.mergeToSkillId});

    changeFromId = (event, index, value) => this.setState({fromId: value});

    changeToId = (event, index, value) => this.setState({toId: value});

    render() {
        const {skills} = this.props;
        const {fromId,toId} = this.state;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Fusionner deux compétences</h3>
                <SelectField floatingLabelText="Remplacer la compétence"
                             value={fromId}
                             hintText="Choisir à la compétence à remplacer"
                             onChange={::this.changeFromId}>
                    {skills.map((skill, index) => <MenuItem value={skill.id} key={index}
                                                            primaryText={skill.name}/>)}
                </SelectField>
                <SelectField floatingLabelText="par"
                             value={toId}
                             hintText="cette compétence"
                             onChange={::this.changeToId}>
                    {skills.map((skill, index) => <MenuItem value={skill.id} key={index}
                                                            primaryText={skill.name}/>)}
                </SelectField>
                <div style={{marginTop: '1rem'}}>
                    <RaisedButton label="Valider" primary={true} onClick={::this.mergeSkills}/>
                </div>
            </Paper>
        );
    }
}

export default MergeSkills;