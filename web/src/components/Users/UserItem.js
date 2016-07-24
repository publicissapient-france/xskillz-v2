import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import {redA400, grey500, grey200} from "material-ui/styles/colors";
import LabelButton from "../LabelButton";
import SkillCard from "../Skills/SkillCard";
import Chip from "material-ui/Chip";
import _ from "lodash";

const styles = {
    domainName: {
        marginRight: '5px',
        color: 'white',
        display: 'inline-block'
    }
};

class UserItem extends Component {

    render() {
        const user = this.props.user;
        const {onUserClick, onSkillClick, updateSkill, removeSkill, details, removeUser} = this.props;

        // noinspection JSUnresolvedVariable
        if (user) {
            return (
                <div className="user-row">
                    <Paper>
                        <div className="remove-icon" onClick={()=>removeUser(user.id)}>x</div>
                        <div className="user-content">
                            <div className="user-left">
                                <Avatar src={user.gravatarUrl} size={75} style={{paddingTop:0}}/>
                            </div>
                            <div className="user-right">
                                <p>
                                    <LabelButton label={user.name} onClick={()=>onUserClick(user.id)}/>
                                </p>
                                { <div className="user-chips">
                                    {_(user.domains)
                                        .sortBy('score').takeRight(2).reverse().map((domain) => {
                                        return (
                                            <Chip key={domain.id} style={styles.domainName} backgroundColor={domain.color} labelStyle={styles.domainName}>
                                                {domain.name}
                                            </Chip>
                                        );
                                    }).value()}
                                </div>}
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