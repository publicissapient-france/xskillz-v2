import React, {Component, PropTypes} from "react";

import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import FlatButton from "material-ui/FlatButton";
import FontIcon from 'material-ui/FontIcon';

import LabelButton from "../LabelButton";
import SkillCard from "../Skills/SkillCard";

import "./UserItem.less";

const styles = {
    domainName: {
        marginRight: '5px',
        color: 'white',
        display: 'inline-block'
    },
    experience: {
        marginRight: '5px',
        color: 'white',
        backgroundColor: '#9b59b6',
        display: 'inline-block'
    },
    seniority: {
        marginRight: '5px',
        color: 'white',
        backgroundColor: '#f1c40f',
        display: 'inline-block'
    }
};

class UserItem extends Component {

    render() {
        const user = this.props.user;
        const {onUserClick, onSkillClick, updateSkill, removeSkill, details} = this.props;

        if (user) {
            // noinspection JSUnresolvedFunction
            return (
                <div className="user-row">
                    <Paper>
                        <div className="user-content">
                            <div className="user-left">
                                <Avatar src={user.gravatarUrl} size={75} style={{paddingTop: 0}}/>
                            </div>
                            <div className="user-right">
                                <p>
                                    <LabelButton label={user.name} onClick={()=>onUserClick(user.readable_id)}/>
                                    {user.manager && <span className="managed-by">managé par {user.manager.name}</span>}
                                </p>
                                <div className="user-chips">
                                    {_(user.domains)
                                        .sortBy('score').takeRight(2).reverse().map((domain) =>
                                            <Chip key={domain.id} style={styles.domainName}
                                                  backgroundColor={domain.color} labelStyle={styles.domainName}>
                                                {domain.name || 'Sans domaine'}
                                            </Chip>
                                        ).value()}
                                    {user.experienceCounter > 0 &&
                                    <Chip style={styles.experience} backgroundColor={styles.experience.backgroundColor} labelStyle={styles.experience}>{user.experienceCounter} XP</Chip>}
                                    {user.seniority > 0 &&
                                    <Chip style={styles.seniority} backgroundColor={styles.seniority.backgroundColor} labelStyle={styles.seniority}>{user.seniority} ans</Chip>}
                                </div>
                            </div>
                        </div>

                        <div className="profile">
                            {user.phone && <div>
                                <FlatButton
                                    href={`tel:${user.phone}`}
                                    label={user.phone}
                                    icon={<FontIcon className="material-icons" color="black">phone</FontIcon>}/>
                            </div>}
                            {user.address && <div>
                                <FlatButton
                                    href={`https://www.google.fr/maps/place/${user.address.label}`}
                                    label={user.address.label}
                                    icon={<FontIcon className="material-icons" color="black">place</FontIcon>}
                                    target="_blank"/>
                            </div>}
                        </div>

                        {details && user.domains &&
                        <div style={{paddingBottom: '.1rem'}}>
                            {user.domains.map((domain, index) => {
                                return (
                                    <div key={index} className={'domains-content'}
                                         style={{backgroundColor: domain.color}}>
                                        <div className={`domain-name domain-${domain.name}`}
                                             style={{color: domain.color}}>{domain.name || 'Sans domaine'}</div>
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