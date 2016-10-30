import React, {Component, PropTypes} from "react";
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
        titles["settings"] = "Préférences";
        titles["help"] = "Aide";
        titles["updates"] = "Skillz";

        const {goToSkills, goToUsers, goToHelp, goToMe, route, goToSettings, goToUpdates, goToManagement} = this.props;

        const style = {height: 'auto'};

        return (
            <AppBar showMenuIconButton={false} title={titles[route.path]}>
                <IconButton onClick={goToMe} style={style} tooltip="Mon profil">
                    <FontIcon className={'material-icons'} color="white">home</FontIcon>
                </IconButton>
                <IconButton onClick={goToSkills} style={style} tooltip="Chercher par compétences">
                    <FontIcon className={'material-icons'} color="white">search</FontIcon>
                </IconButton>
                <IconButton onClick={goToUsers} style={style} tooltip="Utilisateurs">
                    <FontIcon className={'material-icons'} color="white">supervisor_account</FontIcon>
                </IconButton>
                <IconButton onClick={goToUpdates} style={style} tooltip="Dernières mises à jour">
                    <FontIcon className={'material-icons'} color="white">update</FontIcon>
                </IconButton>
                <IconButton onClick={goToManagement} style={style} tooltip="Management">
                    <FontIcon className={'material-icons'} color="white">hearing</FontIcon>
                </IconButton>
                <IconButton onClick={goToSettings} style={style} tooltip="Préférences">
                    <FontIcon className={'material-icons'} color="white">settings</FontIcon>
                </IconButton>
                <IconButton onClick={goToHelp} style={style} tooltip="Aide">
                    <FontIcon className={'material-icons'} color="white">help</FontIcon>
                </IconButton>
            </AppBar>
        );
    }

}

export default HeaderContent;