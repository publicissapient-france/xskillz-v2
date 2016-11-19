import React, {Component, PropTypes} from "react";
import {hasRole, UPDATES, SKILLS, USERS, MANAGEMENT, SETTINGS} from '../../services/permissions';

import AppBar from "material-ui/AppBar";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";

class HeaderContent extends Component {

    render() {
        const titles = [];
        titles["me"] = "Mon profil";
        titles["skills"] = "Chercher par compétence";
        titles["management"] = "Management";
        titles["user/:id"] = "Profil";
        titles["users"] = "Tous les profils";
        titles["domains"] = "Tous les compétences";
        titles["settings"] = "Préférences";
        titles["help"] = "Aide";
        titles["logout"] = "Déconnexion";
        titles["updates"] = "Skillz";

        const {goToSkills, goToUsers, goToHelp, goToMe, goToSettings, goToDomains, goToUpdates, goToManagement, goToLogout} = this.props;

        const style = {height: 'auto'};

        return (
            <AppBar showMenuIconButton={false}>
                {hasRole(UPDATES) && <IconButton onClick={goToUpdates} style={style} tooltip="Dernières mises à jour">
                    <FontIcon className={'material-icons'} color="white">home</FontIcon>
                </IconButton>}
                <IconButton onClick={goToMe} style={style} tooltip="Mon profil">
                    <FontIcon className={'material-icons'} color="white">face</FontIcon>
                </IconButton>
                {hasRole(SKILLS) && <IconButton onClick={goToSkills} style={style} tooltip="Chercher par compétences">
                    <FontIcon className={'material-icons'} color="white">search</FontIcon>
                </IconButton>}
                {hasRole(USERS) && <IconButton onClick={goToUsers} style={style} tooltip="Utilisateurs">
                    <FontIcon className={'material-icons'} color="white">supervisor_account</FontIcon>
                </IconButton>}
                <IconButton onClick={goToDomains} style={style} tooltip="Compétences">
                    <FontIcon className={'material-icons'} color="white">view_module</FontIcon>
                </IconButton>
                {hasRole(MANAGEMENT) && <IconButton onClick={goToManagement} style={style} tooltip="Management">
                    <FontIcon className={'material-icons'} color="white">hearing</FontIcon>
                </IconButton>}
                {hasRole(SETTINGS) && <IconButton onClick={goToSettings} style={style} tooltip="Préférences">
                    <FontIcon className={'material-icons'} color="white">settings</FontIcon>
                </IconButton>}
                <IconButton onClick={goToHelp} style={style} tooltip="Aide">
                    <FontIcon className={'material-icons'} color="white">help</FontIcon>
                </IconButton>
                <IconButton onClick={goToLogout} style={style} tooltip="Déconnexion">
                    <FontIcon className={'material-icons'} color="white">power_settings_new</FontIcon>
                </IconButton>
            </AppBar>
        );
    }

}

export default HeaderContent;