import React, { Component, PropTypes } from 'react';

import { redA400, grey500, grey200 } from 'material-ui/styles/colors';

import Stars from '../Skills/Stars';
import LabelButton from '../LabelButton';

class SkillCard extends Component {

    static propTypes = {
        skill: PropTypes.object.isRequired,
        onSkillClick: PropTypes.func.isRequired,
        updateSkill: PropTypes.func,
        removeSkill: PropTypes.func
    };

    onLikeClicked() {
        const updateSkill = this.props.updateSkill;
        const skill = this.props.skill;
        if (typeof updateSkill === 'function') {
            updateSkill({...skill, interested: !skill.interested});
        }
    }

    onStarClicked(level) {
        const updateSkill = this.props.updateSkill;
        const skill = this.props.skill;
        if (typeof updateSkill === 'function') {
            updateSkill({...skill, level});
        }
    }

    onRemoveClicked() {
        const removeSkill = this.props.removeSkill;
        if (typeof removeSkill === 'function') {
            removeSkill(this.props.skill.id);
        }
    }

    render() {
        const {name, level, interested} = this.props.skill;
        const {onSkillClick, removeSkill} = this.props;

        return (
            <div className={"domain-info skill-level-"+level+" skill-interested-"+interested} onClick={()=>{onSkillClick(name)}}>
                {removeSkill && <div className="remove-icon" onClick={::this.onRemoveClicked}>x</div>}
                <p>
                    {name && <LabelButton label={name} onClick={()=>{onSkillClick(name)}}/>}
                </p>
                {interested && <span className="interested-icon" onClick={::this.onLikeClicked}
                                     style={{color: redA400, cursor:'pointer'}}>&#9829;</span>}
                {!interested && <span className="interested-icon" onClick={::this.onLikeClicked}
                                      style={{color: grey500, cursor:'pointer'}}>&#9825;</span>}
                <Stars level={level} onStarClicked={::this.onStarClicked}/>
            </div>
        );
    }

}

export default SkillCard;