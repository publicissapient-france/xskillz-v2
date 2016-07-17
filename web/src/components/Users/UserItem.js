import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { redA400, grey500, grey200 } from 'material-ui/styles/colors';

import LabelButton from '../LabelButton';
import SkillCard from '../Skills/SkillCard';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        paddingLeft:0,
        color:'white'
    }
};

class UserItem extends Component {

    render() {
        const user = this.props.user;
        const { onUserClick, onSkillClick, updateSkill, removeSkill, details, removeUser } = this.props;

        // noinspection JSUnresolvedVariable
        if (user) {
            return (
                <div className="user-row">
                    <Paper>
                        <div className="remove-icon" onClick={()=>removeUser(user.id)}>x</div>
                        <div className="user-content">
                            <div className="user-left">
                                <Avatar src={user.gravatarUrl} size={75}/>
                            </div>
                            <div className="user-right">
                                <p>
                                    <LabelButton label={user.name} onClick={()=>onUserClick(user.id)}/>
                                </p>
                                <Chip backgroundColor="#9b59b6" labelStyle={styles.chip}>
                                    <Avatar size={32} backgroundColor="#9b59b6">{user.experienceCounter || '-'}</Avatar>
                                    XP
                                </Chip>
                            </div>
                        </div>
                        {details && user.domains &&
                        <div style={{paddingBottom: '.1rem'}}>
                            {user.domains.map((domain, index) => {
                                return (
                                    <div key={index} className={`domains-content domain-${domain.name}`}>
                                        <div className={`domain-name domain-${domain.name}`}>{domain.name}</div>
                                        <div className="skills-content">
                                            {domain.skills.map((skill, index) => {
                                                // noinspection JSUnresolvedVariable
                                                return (
                                                    <SkillCard updateSkill={updateSkill} key={index} skill={skill}
                                                               onSkillClick={onSkillClick} removeSkill={removeSkill}/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>}
                    </Paper>
                </div>
            );
        }
        return <div></div>;
    }

}

export default UserItem;