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

        this.state = {id: null, domain: {id: null}, name: null, level: 0, interested: false};
    }

    componentDidMount() {
        const skills = this.props.skills;
        if (!skills.loaded) {
            this.props.fetchSkills();
        }
    }

    onStarSelected = count => this.setState({level: count});

    onLikeSelected = like => this.setState({interested: like});

    onSubmitClicked() {
        this.props.addSkill(this.state);
    }

    onNewRequest = (name, index) => {
        const skill = this.props.skills.list[index];
        if (skill) {
            this.setState({name: skill.name, id: skill.id, domain: skill.domain});
        }
    };

    onUpdateInput = (searchText, nameArray) => this.setState({name: searchText, id: null, domain: {id: null}});

    render() {
        const nameArray = [];
        _.each(this.props.skills.list, skill => nameArray.push(skill.name));

        return (
            <div className="add-skill-form">
                <Paper>
                    <div className="content">
                        <div className="autocomplete">
                            <AutoComplete hintText={'Ajouter une compétence ...'}
                                          dataSource={nameArray}
                                          filter={AutoComplete.fuzzyFilter}
                                          menuStyle={{cursor:'pointer'}}
                                          fullWidth
                                          onNewRequest={::this.onNewRequest}
                                          onUpdateInput={::this.onUpdateInput}/>
                        </div>
                        <div className="stars">
                            <EditableStars mark={0} handleClick={::this.onStarSelected}/>
                        </div>
                        <div className="heart">
                            <EditableLike like={false} handleClick={::this.onLikeSelected}/>
                        </div>
                        <div className="button">
                            <RaisedButton primary label="Ajouter" onClick={::this.onSubmitClicked}/>
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