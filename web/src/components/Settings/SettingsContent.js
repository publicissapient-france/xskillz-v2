import React, { Component, PropTypes } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class SettingsContent extends Component {

    static propTypes = {
        domains: PropTypes.object.isRequired,
        skills: PropTypes.object.isRequired,
        fetchDomains: PropTypes.func.isRequired,
        linkSkillToDomain: PropTypes.func.isRequired,
        deleteDomain: PropTypes.func.isRequired,
        addDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {skill: {id: null}, domain: {id: null}, domainToRemove: {id: null}};
    };

    componentDidMount() {
        const domains = this.props.domains;
        if (!domains.loaded) {
            this.props.fetchDomains();
        }
        const skills = this.props.skills;
        if (!skills.loaded) {
            this.props.fetchSkills();
        }
    };

    linkSkillToDomain = () => {
        const { skill, domain } = this.state;
        this.props.linkSkillToDomain({skill: {id: skill.id}, domain: {id: domain.id}});
    };

    changeDomain = (event, index, value) => this.setState({domain: {id: value}});

    changeSkill = (event, index, value) => this.setState({skill: {id: value}});

    changeDomainToRemove = (event, index, value) => this.setState({domainToRemove: {id: value}});

    deleteDomain = () => this.props.deleteDomain(this.state.domainToRemove.id);

    addDomainName = event => this.setState({addDomainName: event.currentTarget.value});

    addDomainColor = event => this.setState({addDomainColor: event.currentTarget.value});

    addDomain = () => this.props.addDomain({name: this.state.addDomainName, color: this.state.addDomainColor});

    render() {
        const domains = this.props.domains.list;
        const skills = this.props.skills.list;
        const { domain, skill, domainToRemove } = this.state;

        return (
            <div className="signin">
                <h2>Link skill with domain</h2>
                <div>
                    <SelectField floatingLabelText="Skill's name" value={skill.id} hintText="Choose a skill"
                                 onChange={::this.changeSkill}>
                        {skills.map((skill, index) => <MenuItem value={skill.id} key={index}
                                                                primaryText={skill.name}/>)}
                    </SelectField>
                    <SelectField floatingLabelText="Domain's name" value={domain.id} hintText="Choose a domain"
                                 onChange={::this.changeDomain}>
                        {domains.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                  primaryText={domain.name}/>)}
                    </SelectField>
                    <div>
                        <RaisedButton label="Associate" primary={true} onClick={::this.linkSkillToDomain}/>
                    </div>
                </div>
                <br/>
                <br/>
                <Divider/>
                <h2>Delete domain</h2>
                <div>
                    <SelectField floatingLabelText="Domain's name" value={domainToRemove.id} hintText="Choose a domain"
                                 onChange={::this.changeDomainToRemove}>
                        {domains.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                  primaryText={domain.name}/>)}
                    </SelectField>
                    <div>
                        <RaisedButton label="Remove" primary={true} onClick={::this.deleteDomain}/>
                    </div>
                </div>
                <br/>
                <br/>
                <Divider/>
                <h2>Add domain</h2>
                <div>
                    <TextField floatingLabelText="Domain's name" onBlur={::this.addDomainName}/>
                    <TextField floatingLabelText="Color prefixed by #" onBlur={::this.addDomainColor}/>
                    <div>
                        <RaisedButton label="Add" primary={true} onClick={::this.addDomain}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default SettingsContent;