import React, {Component, PropTypes} from "react";

import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import Snackbar from "material-ui/Snackbar";

import _ from 'lodash';

import EditableStars from "./EditableStars";
import EditableLike from "./EditableLike";
import "./AddSkillForm.less";

class AddSkillForm extends Component {
    constructor(props) {
        super(props);

        this.state = {id: null, domain: {id: null}, name: '', level: 0, interested: false, submit: false};
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
        this.setState({submit: true});
        this.props.addSkill(this.state);
    }

    onNewRequest = (name, index) => {
        this.setState({submit: false});
        const skill = this.props.skills.list[index];
        if (skill) {
            this.setState({name: skill.name, id: skill.id, domain: skill.domain});
        }
    };

    onUpdateInput = searchText => {
        this.setState({submit: false});
        this.setState({name: searchText, id: null, domain: {id: null}})
    };

    onSnackBarClose() {
        this.setState({submit: false});
    }

    render() {
        const nameArray = [];
        _.each(this.props.skills.list, skill => nameArray.push(skill.name));

        return (
            <div className="add-skill-form">
                <Paper style={{margin: '.5em', padding: '10px'}}>
                    <div className="content">
                        <div className="autocomplete">
                            <AutoComplete hintText={'Ajouter une compétence ...'}
                                          dataSource={nameArray}
                                          filter={AutoComplete.fuzzyFilter}
                                          menuStyle={{cursor: 'pointer'}}
                                          fullWidth
                                          onNewRequest={::this.onNewRequest}
                                          onUpdateInput={::this.onUpdateInput}
                                          maxSearchResults={10}/>
                        </div>
                        <div className="stars">
                            <EditableStars mark={0} handleClick={::this.onStarSelected}/>
                        </div>
                        <div className="heart">
                            <EditableLike like={false} handleClick={::this.onLikeSelected}/>
                        </div>
                        <div className="button">
                            <RaisedButton
                              primary
                              label="Ajouter"
                              onClick={::this.onSubmitClicked}
                              disabled={_.isEmpty(this.state.name)}/>
                        </div>
                    </div>
                </Paper>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={this.state.submit}
                    message={`Compétence ${this.state.name} ajoutée.`}
                    autoHideDuration={3000}
                    onRequestClose={::this.onSnackBarClose}/>
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