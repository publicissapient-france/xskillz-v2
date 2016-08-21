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
import Config from '../../Config';
import LinkSkillToDomain from "../Skills/LinkSkillToDomain/LinkSkillToDomain";
import MergeSkills from '../Skills/MergeSkills/MergeSkills';
import AddDomain from '../Domain/Add/AddDomain';
import DeleteDomain from '../Domain/Del/DeleteDomain';

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

    render() {
        const domains = this.props.domains.list;
        const skills = this.props.skills.list;
        const {linkSkillToDomain, mergeSkills, addDomain, deleteDomain, saveDiploma, assignUserToManager, users, fetchUsers} = this.props;

        return (
            <div className="content">
                <Tabs>
                    <Tab label="Compétences">
                        <LinkSkillToDomain domains={domains} skills={skills} linkSkillToDomain={linkSkillToDomain}/>
                        <MergeSkills skills={skills} mergeSkills={mergeSkills}/>
                    </Tab>
                    <Tab label="Domaines">
                        <AddDomain addDomain={addDomain}/>
                        <DeleteDomain deleteDomain={deleteDomain} domains={domains}/>
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