import React, {Component, PropTypes} from "react";
import {Tabs, Tab} from "material-ui/Tabs";

import DiplomaDatePicker from "../Manager/DiplomaDatePicker";
import EmployeeDatePicker from "../Manager/EmployeeDatePicker";
import AvailabilityDatePicker from "../Manager/AvailabilityDatePicker";
import AssignUserToManager from "../Manager/AssignUserToManager";
import QRCodeURL from "../Api/QRCodeURL/QRCodeURL";
import Config from '../../Config';
import LinkSkillToDomain from "../Skills/LinkSkillToDomain/LinkSkillToDomain";
import MergeSkills from '../Skills/MergeSkills/MergeSkills';
import AddDomain from '../Domain/Add/AddDomain';
import DeleteDomain from '../Domain/Del/DeleteDomain';
import PromoteManager from '../Manager/PromoteManager';
import CreateUser from '../Users/CreateUser/CreateUser';

import {hasRole, MANAGER} from '../../services/permissions';

class SettingsContent extends Component {

    static propTypes = {
        domains: PropTypes.object.isRequired,
        skills: PropTypes.object.isRequired,
        fetchDomains: PropTypes.func.isRequired,
        linkSkillToDomain: PropTypes.func.isRequired,
        deleteDomain: PropTypes.func.isRequired,
        addDomain: PropTypes.func.isRequired,
        mergeSkills: PropTypes.func.isRequired,
        saveDiploma: PropTypes.func.isRequired,
        saveEmployeeDate: PropTypes.func.isRequired,
        saveAvailabilityDate: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        fetchManagers: PropTypes.func.isRequired,
        promoteManager: PropTypes.func.isRequired,
        fetchUsers: PropTypes.func.isRequired,
        changePassword: PropTypes.func.isRequired,
        me: PropTypes.object.isRequired
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
        const users = this.props.users;
        if (!users.loaded) {
            this.props.fetchUsers();
        }
    };

    render() {
        const domains = this.props.domains.list;
        const skills = this.props.skills.list;
        const {auth} = this.props;
        const {
            createUser, promoteManager, fetchManagers, linkSkillToDomain,
            mergeSkills, addDomain, deleteDomain, saveDiploma, saveEmployeeDate, saveAvailabilityDate, assignUserToManager, users, fetchUsers
        } = this.props;
        return (
            <div className="content">
                <Tabs>
                    <Tab label="Compétences">
                        <LinkSkillToDomain domains={domains} skills={skills} linkSkillToDomain={linkSkillToDomain}/>
                        <MergeSkills skills={skills} mergeSkills={mergeSkills}/>
                    </Tab>
                    {hasRole(MANAGER) && <Tab label="Domaines">
                        <AddDomain addDomain={addDomain}/>
                        <DeleteDomain deleteDomain={deleteDomain} domains={domains}/>
                    </Tab>}

                    <Tab label="Utilisateurs">
                        {hasRole(MANAGER) && <DiplomaDatePicker saveDiploma={saveDiploma} users={users}/>}
                        {hasRole(MANAGER) && <EmployeeDatePicker saveEmployeeDate={saveEmployeeDate} users={users}/>}
                        {hasRole(MANAGER) && <AvailabilityDatePicker saveAvailabilityDate={saveAvailabilityDate} users={users}/>}
                        {hasRole(MANAGER) &&
                        <AssignUserToManager assignUserToManager={assignUserToManager} users={users}
                                             fetchUsers={fetchUsers} fetchManagers={fetchManagers}/>}
                        {hasRole(MANAGER) && <PromoteManager users={users} promoteManager={promoteManager}/>}
                        {hasRole(MANAGER) && <CreateUser auth={auth} createUser={createUser}/>}
                    </Tab>
                    <Tab label="QR Code">
                        <QRCodeURL url={Config.apiURL}/>
                    </Tab>
                </Tabs>
            </div>);
    }
}
export default SettingsContent;