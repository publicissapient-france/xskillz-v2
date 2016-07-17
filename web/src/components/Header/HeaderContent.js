import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

class HeaderContent extends Component {

    render() {
        const { goToSkills, goToUsers, goToHelp, goToMe, route, goToSettings } = this.props;

        const style = {height: 'auto'};

        return (
            <AppBar showMenuIconButton={false} title={route.path} titleStyle={{textTransform: 'capitalize'}}>
                <IconButton onClick={goToMe} style={style} tooltip="My Profile">
                    <FontIcon className={'material-icons'} color="white">home</FontIcon>
                </IconButton>
                <IconButton onClick={goToSkills} style={style} tooltip="Search Skills">
                    <FontIcon className={'material-icons'} color="white">search</FontIcon>
                </IconButton>
                <IconButton onClick={goToUsers} style={style} tooltip="Search Users">
                    <FontIcon className={'material-icons'} color="white">person_pin</FontIcon>
                </IconButton>
                <IconButton onClick={goToSettings} style={style} tooltip="Preferences">
                    <FontIcon className={'material-icons'} color="white">settings</FontIcon>
                </IconButton>
                <IconButton onClick={goToHelp} style={style} tooltip="Help">
                    <FontIcon className={'material-icons'} color="white">help</FontIcon>
                </IconButton>
            </AppBar>
        );
    }

}

export default HeaderContent;