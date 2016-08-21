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
import LinkSkillToDomain from "../Skills/LinkSkillToDomain/LinkSkillToDomain";
import MergeSkills from "../Skills/MergeSkills/MergeSkills";

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

    changeDomainToRemove = (event, index, value) => this.setState({domainToRemove: {id: value}});

    deleteDomain = () => this.props.deleteDomain(this.state.domainToRemove.id);

    addDomainName = event => this.setState({addDomainName: event.currentTarget.value});

    addDomainColor = event => this.setState({addDomainColor: event.currentTarget.value});

    addDomain = () => this.props.addDomain({name: this.state.addDomainName, color: this.state.addDomainColor});

    render() {
        const domains = this.props.domains.list;
        const skills = this.props.skills.list;
        const {domainToRemove} = this.state;
        const {linkSkillToDomain, mergeSkills, saveDiploma, assignUserToManager, users, fetchUsers} = this.props;

        return (
            <div className="content">
                <Tabs>
                    <Tab label="Compétences">
                        <LinkSkillToDomain domains={domains} skills={skills} linkSkillToDomain={linkSkillToDomain}/>
                        <MergeSkills skills={skills} mergeSkills={mergeSkills}/>
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