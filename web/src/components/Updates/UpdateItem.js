import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

import LevelToHRValue from '../Skills/LevelToHRValue';
import LabelButton from '../LabelButton';
import SkillCard from '../Skills/SkillCard';

class UpdateItem extends Component {

    render() {

        const { onUserClick, update, onSkillClick } = this.props;
        const { name, companyName, gravatarUrl } = update.user;

        return (
            <div className="user-row">
                <Paper>
                    <div className="company-name">{companyName}</div>
                    <div className="user-content">
                        <div className="user-left">
                            <Avatar src={gravatarUrl}/>
                        </div>
                        <div className="user-right">
                            <LabelButton label={name} onClick={()=>{onUserClick(name)}}/>
                            &nbsp;a mis à jour {update.updates.length} skill{update.updates.length>1?'s':''}.
                        </div>
                    </div>
                    <div className="domains-content">
                        {update.updates.map((update, index) => {
                            return (
                                <SkillCard skill={update.skill} key={index} onSkillClick={onSkillClick}/>
                            )
                        })}
                    </div>
                </Paper>
            </div>
        )
    }

}

export default UpdateItem;