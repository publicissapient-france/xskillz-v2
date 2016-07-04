import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

class HeaderContent extends Component {

    render() {
        const { goToSkills, goToUsers, goToUpdates, goToMe, route, goToSettings } = this.props;

        const style = {height: 'auto'};

        return (
            <AppBar showMenuIconButton={false} title={route.path} titleStyle={{textTransform: 'capitalize'}}>
                <IconButton onClick={goToMe} style={style}>
                    <FontIcon className={'material-icons'} color="white">account_box</FontIcon>
                </IconButton>
                <IconButton onClick={goToUpdates} style={style}>
                    <FontIcon className={'material-icons'} color="white">home</FontIcon>
                </IconButton>
                <IconButton onClick={goToSkills} style={style}>
                    <FontIcon className={'material-icons'} color="white">assignment_turned_in</FontIcon>
                </IconButton>
                <IconButton onClick={goToUsers} style={style}>
                    <FontIcon className={'material-icons'} color="white">person_pin</FontIcon>
                </IconButton>
                <IconButton onClick={goToSettings} style={style}>
                    <FontIcon className={'material-icons'} color="white">settings</FontIcon>
                </IconButton>
            </AppBar>
        );
    }

}

export default HeaderContent;