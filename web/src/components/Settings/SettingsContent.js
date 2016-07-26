import React, {Component, PropTypes} from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import DiplomaDatePicker from "../Manager/DiplomaDatePicker";
import AssignUserToManager from "../Manager/AssignUserToManager";
import QRCodeURL from "../Api/QRCodeURL/QRCodeURL";
import {Tabs, Tab} from "material-ui/Tabs";
import Config from "../../Config";

class SettingsContent extends Component {

    static propTypes = {
        domains: PropTypes.object.isRequired,
        skills: PropTypes.object.isRequired,
        fetchDomains: PropTypes.func.isRequired,
        linkSkillToDomain: PropTypes.func.isRequired,
        deleteDomain: PropTypes.func.isRequired,
        addDomain: PropTypes.func.isRequired,
        mergeSkills: PropTypes.func.isRequired,
        saveDiploma: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            skill: {id: null},
            domain: {id: null},
            domainToRemove: {id: null},
            mergeFromSkillId: null,
            mergeToSkillId: null
        };
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
        const {skill, domain} = this.state;
        this.props.linkSkillToDomain({skill: {id: skill.id}, domain: {id: domain.id}});
    };

    changeDomain = (event, index, value) => this.setState({domain: {id: value}});

    changeSkill = (event, index, value) => this.setState({skill: {id: value}});

    changeMergeFromSkillId = (event, index, value) => this.setState({mergeFromSkillId: value});

    changeMergeToSkillId = (event, index, value) => this.setState({mergeToSkillId: value});

    changeDomainToRemove = (event, index, value) => this.setState({domainToRemove: {id: value}});

    deleteDomain = () => this.props.deleteDomain(this.state.domainToRemove.id);

    addDomainName = event => this.setState({addDomainName: event.currentTarget.value});

    addDomainColor = event => this.setState({addDomainColor: event.currentTarget.value});

    addDomain = () => this.props.addDomain({name: this.state.addDomainName, color: this.state.addDomainColor});

    mergeSkills = () => this.props.mergeSkills({from: this.state.mergeFromSkillId, to: this.state.mergeToSkillId});

    render() {
        const domains = this.props.domains.list;
        const skills = this.props.skills.list;
        const {domain, skill, domainToRemove, mergeFromSkillId, mergeToSkillId} = this.state;
        const {saveDiploma, assignUserToManager, users, fetchUsers} = this.props;

        const styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400,
            }
        };

        return (
            <div className="content">
                <Tabs>
                    <Tab label="Compétences">
                        <h2>Ranger les compétences par domaine</h2>
                        <div>
                            <SelectField floatingLabelText="Compétence" value={skill.id} hintText="Choisir la compétence à ranger"
                                         onChange={::this.changeSkill}>
                                {skills.map((skill, index) => <MenuItem value={skill.id} key={index}
                                                                        primaryText={skill.name}/>)}
                            </SelectField>
                            <SelectField floatingLabelText="Domaine" value={domain.id} hintText="Choisir le domaine cible"
                                         onChange={::this.changeDomain}>
                                {domains.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                          primaryText={domain.name}/>)}
                            </SelectField>
                            <div>
                                <RaisedButton label="Valider" primary={true} onClick={::this.linkSkillToDomain}/>
                            </div>
                        </div>
                        <br/><br/>
                        <Divider/>
                        <h2>Fusionner deux compétences</h2>
                        <SelectField floatingLabelText="Remplacer la compétence"
                                     value={mergeFromSkillId}
                                     hintText="Choisir à la compétence à remplacer"
                                     onChange={::this.changeMergeFromSkillId}>
                            {skills.map((skill, index) => <MenuItem value={skill.id} key={index}
                                                                    primaryText={skill.name}/>)}
                        </SelectField>
                        <SelectField floatingLabelText="par"
                                     value={mergeToSkillId}
                                     hintText="cette compétence"
                                     onChange={::this.changeMergeToSkillId}>
                            {skills.map((skill, index) => <MenuItem value={skill.id} key={index}
                                                                    primaryText={skill.name}/>)}
                        </SelectField>
                        <div>
                            <RaisedButton label="Valider" primary={true} onClick={::this.mergeSkills}/>
                        </div>
                    </Tab>
                    <Tab label="Domaines">
                        <h2>Ajouter un domaine</h2>
                        <div>
                            <TextField floatingLabelText="Domaine" onBlur={::this.addDomainName}/>
                            <TextField floatingLabelText="Couleur préfixée par #" onBlur={::this.addDomainColor}/>
                            <div>
                                <RaisedButton label="Ajouter" primary={true} onClick={::this.addDomain}/>
                            </div>
                        </div>
                        <br/><br/>
                        <Divider/>
                        <h2>Supprimer un domaine</h2>
                        <div>
                            <SelectField floatingLabelText="Domaine" value={domainToRemove.id}
                                         hintText="Choisir un domaine"
                                         onChange={::this.changeDomainToRemove}>
                                {domains.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                          primaryText={domain.name}/>)}
                            </SelectField>
                            <div>
                                <RaisedButton label="Supprimer" primary={true} onClick={::this.deleteDomain}/>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Utilisateurs">

                        <DiplomaDatePicker saveDiploma={saveDiploma} users={users} fetchUsers={fetchUsers}/>
                        <br/><br/>
                        <Divider/>
                        <AssignUserToManager assignUserToManager={assignUserToManager} users={users}
                                             fetchUsers={fetchUsers}/>
                    </Tab>
                    <Tab label="QR Code">
                        <QRCodeURL url={Config.apiURL}/>
                    </Tab>
                </Tabs>
            </div>);
    }
}
export default SettingsContent;