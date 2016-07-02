import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import { redA400, grey500 } from 'material-ui/styles/colors';

import LabelButton from '../LabelButton';

class SkillUserItem extends Component {

    render() {

        const { onUserClick, user } = this.props;

        //noinspection JSUnresolvedVariable
        return (
            <div className="user-row">
                <Paper>
                    <div className="company-name">{user.companyName}</div>
                    <div className="user-content">
                        <div className="user-left">
                            <Avatar src={user.gravatarUrl}/>
                        </div>
                        <div className="user-right">
                            {user.name && <p>
                                <LabelButton label={user.name} onClick={()=>{onUserClick(user.name)}}/>
                            </p>}
                            <p>{user.experienceCounter} xp</p>
                            {user.interested && <p style={{color: redA400}}>&#9829;</p>}
                            {!user.interested && <p style={{color: grey500}}>&#9825;</p>}
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }

}

export default SkillUserItem;