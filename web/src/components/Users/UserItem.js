import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import LabelButton from "../LabelButton";
import SkillCard from "../Skills/SkillCard";
import Phone from "../../assets/phone.svg";
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
                                    <LabelButton label={user.name} onClick={()=>onUserClick(user.id)}/>
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
                                </div>
                                {user.phone && <div className="profile">
                                    <img src={Phone} alt="téléphone"/><a href={`tel:${user.phone}`}>{user.phone}</a>
                                </div>}
                            </div>
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