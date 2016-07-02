import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import EditableStars from './EditableStars';
import EditableLike from './EditableLike';
import _ from 'lodash';
import './AddSkillForm.less';

class AddSkillForm extends Component {
    constructor(props) {
        super(props);

        this.onSkillSelected = this.onSkillSelected.bind(this);
        this.onStarSelected = this.onStarSelected.bind(this);
        this.onLikeSelected = this.onLikeSelected.bind(this);
        this.onSubmitClicked = this.onSubmitClicked.bind(this);
        this.skill = {};
    }

    componentDidMount() {
        const skills = this.props.skills;
        if (!skills.loaded) {
            this.props.fetchSkills();
        }
    }

    onSkillSelected(name) {
        this.skill.name = name;
    }

    onStarSelected(count) {
        this.skill.level = count;
    }

    onLikeSelected(like) {
        this.skill.interested = like;
    }

    onSubmitClicked() {
        if (this.skill.name) {
            this.props.addSkill(this.skill);
        }
    }

    render() {
        const nameArray = [];
        _.each(this.props.skills.list, skill => nameArray.push(skill.name));
        const { newSkill } = this.props.skills;

        return (
            <div className="add-skill-form">
                <Paper>
                    <div className="content">
                        <div className="autocomplete">
                            <AutoComplete hintText={'Enter skill name...'}
                                          dataSource={nameArray}
                                          filter={AutoComplete.fuzzyFilter}
                                          onNewRequest={this.onSkillSelected}
                                          fullWidth/>
                        </div>
                        <div className="stars">
                            <EditableStars mark={0} handleClick={this.onStarSelected}/>
                        </div>
                        <div className="heart">
                            <EditableLike like={false} handleClick={this.onLikeSelected}/>
                        </div>
                        <div className="button">
                            <RaisedButton primary label="Add skill" onClick={this.onSubmitClicked}/>
                        </div>
                    </div>
                </Paper>
                <Snackbar open={newSkill.id !== undefined} message={`${newSkill.name} added`} autoHideDuration={2000}/>
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