import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

class LinkSkillToDomain extends Component {

    static propTypes = {
        domains: PropTypes.array.isRequired,
        skills: PropTypes.array.isRequired,
        linkSkillToDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {skillId: null, domainId: null};
    }

    changeSkill = (event, index, value) => this.setState({skillId: value});

    changeDomain = (event, index, value) => this.setState({domainId: value});

    linkSkillToDomain = () => {
        const {skillId, domainId} = this.state;
        this.props.linkSkillToDomain({skill: {id: skillId}, domain: {id: domainId}});
    };

    render() {
        const {domains, skills} = this.props;
        const {domainId, skillId} = this.state;
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Ranger les compétences par domaine</h3>
                <div>
                    <SelectField floatingLabelText="Compétence" value={skillId}
                                 hintText="Choisir la compétence à ranger"
                                 onChange={::this.changeSkill}>
                        {skills.map((skill, index) => <MenuItem value={skill.id} key={index}
                                                                primaryText={skill.name}/>)}
                    </SelectField>
                    <SelectField floatingLabelText="Domaine" value={domainId} hintText="Choisir le domaine cible"
                                 onChange={::this.changeDomain}>
                        {domains.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                  primaryText={domain.name}/>)}
                    </SelectField>
                    <div style={{marginTop: '1rem'}}>
                        <RaisedButton label="Valider" primary={true} onClick={::this.linkSkillToDomain}/>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default LinkSkillToDomain;