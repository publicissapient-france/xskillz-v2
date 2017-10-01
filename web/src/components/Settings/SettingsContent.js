import React, { Component, PropTypes } from "react";
import { Tab, Tabs } from "material-ui/Tabs";
import { RaisedButton } from "material-ui";

import DiplomaDatePicker from "../Manager/DiplomaDatePicker";
import EmployeeDatePicker from "../Manager/EmployeeDatePicker";
import EmployeeEndDatePicker from "../Manager/EmployeeEndDatePicker";
import AvailabilityDatePicker from "../Manager/AvailabilityDatePicker";
import AssignUserToManager from "../Manager/AssignUserToManager";
import LinkSkillToDomain from "../Skills/LinkSkillToDomain/LinkSkillToDomain";
import MergeSkills from '../Skills/MergeSkills/MergeSkills';
import AddDomain from '../Domain/Add/AddDomain';
import DeleteDomain from '../Domain/Del/DeleteDomain';
import PromoteManager from '../Manager/PromoteManager';
import CreateUser from '../Users/CreateUser/CreateUser';

import { hasRole, MANAGER } from '../../services/permissions';

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
        saveEmployeeEndDate: PropTypes.func.isRequired,
        saveAvailabilityDate: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        fetchManagers: PropTypes.func.isRequired,
        promoteManager: PropTypes.func.isRequired,
        fetchUsers: PropTypes.func.isRequired,
        me: PropTypes.object.isRequired,
        exportSkills: PropTypes.func.isRequired,
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

    exportSkills = () => {
        this.props.exportSkills();
    };

    render() {
        const domains = this.props.domains;
        const skills = this.props.skills;
        const { auth } = this.props;
        const {
            createUser, promoteManager, fetchManagers, linkSkillToDomain,
            mergeSkills, addDomain, deleteDomain, saveDiploma, saveEmployeeDate, saveEmployeeEndDate, saveAvailabilityDate, assignUserToManager, users, fetchUsers
        } = this.props;
        return (
            <div className="content">
                <Tabs>
                    <Tab label="Compétences">
                        <LinkSkillToDomain domains={domains} skills={skills} linkSkillToDomain={linkSkillToDomain} />
                        <MergeSkills skills={skills} mergeSkills={mergeSkills} />
                        <div style={{paddingLeft:'0.2em'}}>
                            <RaisedButton label="Exporter" primary={true} onClick={::this.exportSkills} />
                        </div>
                    </Tab>
                    {hasRole(MANAGER) && <Tab label="Domaines">
                        <AddDomain domains={domains} addDomain={addDomain} />
                        <DeleteDomain domains={domains} deleteDomain={deleteDomain} />
                    </Tab>}

                    <Tab label="Utilisateurs">
                        {hasRole(MANAGER) && <DiplomaDatePicker saveDiploma={saveDiploma} users={users} />}
                        {hasRole(MANAGER) && <EmployeeDatePicker saveEmployeeDate={saveEmployeeDate} users={users} />}
                        {hasRole(MANAGER) &&
                        <EmployeeEndDatePicker saveEmployeeEndDate={saveEmployeeEndDate} users={users} />}
                        {hasRole(MANAGER) &&
                        <AvailabilityDatePicker saveAvailabilityDate={saveAvailabilityDate} users={users} />}
                        {hasRole(MANAGER) &&
                        <AssignUserToManager assignUserToManager={assignUserToManager} users={users}
                                             fetchUsers={fetchUsers} fetchManagers={fetchManagers} />}
                        {hasRole(MANAGER) && <PromoteManager users={users} promoteManager={promoteManager} />}
                        {hasRole(MANAGER) && <CreateUser auth={auth} createUser={createUser} />}
                    </Tab>
                </Tabs>
            </div>);
    }
}

export default SettingsContent;