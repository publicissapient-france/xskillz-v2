import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import EditableStars from './EditableStars';
import EditableLike from './EditableLike';
import _ from 'lodash';
import './AddSkillForm.less';

class AddSkillForm extends Component {
    constructor(props) {
        super(props);

        this.skill = {
            id: null,
            interested: false,
            level: 0,
            name: null
        };
    }

    componentDidMount() {
        const skills = this.props.skills;
        if (!skills.loaded) {
            this.props.fetchSkills();
        }
    }

    onStarSelected(count) {
        this.skill.level = count;
    }

    onLikeSelected(like) {
        this.skill.interested = like;
    }

    onSubmitClicked() {
        this.props.addSkill(this.skill);
    }

    onUpdateSkill = (name, index) => {
        const skill = this.props.skills.list[index];

        this.skill.name = skill.name;
        this.skill.id = skill.id;
        this.skill.domain = skill.domain;
    };

    render() {
        const nameArray = [];
        _.each(this.props.skills.list, skill => nameArray.push(skill.name));

        return (
            <div className="add-skill-form">
                <Paper>
                    <div className="content">
                        <div className="autocomplete">
                            <AutoComplete hintText={'Enter skill name...'}
                                          dataSource={nameArray}
                                          filter={AutoComplete.fuzzyFilter}
                                          menuStyle={{cursor:'pointer'}}
                                          fullWidth
                                          onNewRequest={::this.onUpdateSkill}/>
                        </div>
                        <div className="stars">
                            <EditableStars mark={0} handleClick={::this.onStarSelected}/>
                        </div>
                        <div className="heart">
                            <EditableLike like={false} handleClick={::this.onLikeSelected}/>
                        </div>
                        <div className="button">
                            <RaisedButton primary label="Add skill" onClick={::this.onSubmitClicked}/>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

AddSkillForm.propTypes = {
    skills: PropTypes.object.isRequired,
    fetchSkills: PropTypes.func.isRequired,
    addSkill: PropTypes.func.isRequired
};

export default AddSkillForm;