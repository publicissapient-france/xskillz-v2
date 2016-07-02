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

    constructor(props) {
        super(props);

        const skill = this.props.skill;
        this.state = Object.assign({}, skill);
    }

    onLikeClicked() {
        const updateSkill = this.props.updateSkill;
        const skill = this.state;
        if (typeof updateSkill === 'function') {
            updateSkill(Object.assign({}, skill, {interested: !skill.interested}));
            this.setState({interested: !skill.interested});
        }
    }

    onStarClicked(level) {
        const updateSkill = this.props.updateSkill;
        const skill = this.state;
        if (typeof updateSkill === 'function') {
            updateSkill(Object.assign({}, skill, {level}));
            this.setState({level});
        }
    }

    onRemoveClicked() {
        const removeSkill = this.props.removeSkill;
        if (typeof removeSkill === 'function') {
            removeSkill(this.props.skill.id);
        }
    }

    render() {
        const name = this.props.skill.name;
        const { interested, level } = this.state;
        const onSkillClick = this.props.onSkillClick;

        return (
            <div className="domain-info">
                <div className="remove-icon" onClick={::this.onRemoveClicked}>x</div>
                <p>
                    {name && <LabelButton label={name} onClick={()=>{onSkillClick(name)}}/>}
                    {interested && <span onClick={::this.onLikeClicked} style={{color: redA400}}>&#9829;</span>}
                    {!interested && <span onClick={::this.onLikeClicked} style={{color: grey500}}>&#9825;</span>}
                </p>
                <Stars level={level} onStarClicked={::this.onStarClicked}/>
            </div>
        );
    }

}

export default SkillCard;