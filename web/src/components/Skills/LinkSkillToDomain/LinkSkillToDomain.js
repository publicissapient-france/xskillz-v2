import React, { Component, PropTypes } from "react";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import _ from "lodash";
import AutoComplete from "material-ui/AutoComplete";
import Snackbar from "material-ui/Snackbar";

class LinkSkillToDomain extends Component {

    static propTypes = {
        domains: PropTypes.object.isRequired,
        skills: PropTypes.object.isRequired,
        linkSkillToDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { skillId: null, domainId: null, submit: false, snackOpen: false };
    }

    changeDomain = (event, index, value) => this.setState({
        domainId: value,
        domainName: this.props.domains.list[index].name
    });

    linkSkillToDomain = () => {
        this.setState({ submit: true, snackOpen: false });
        const { skillId, domainId } = this.state;
        this.props.linkSkillToDomain({ skill: { id: skillId }, domain: { id: domainId } });
    };

    onSkillChange = (name, index) => {
        if (index >= 0) {
            this.setState(
                {
                    skillId: this.props.skills.list[index].id,
                    skillName: this.props.skills.list[index].name
                });
        }
    };

    onSnackClose = () => this.setState({ snackOpen: false, submit: false });

    render() {
        const domainList = this.props.domains.list;
        const skillLinked = this.props.domains.skillLinked;
        let { submit, domainId, skillId } = this.state;
        const { skills: { list } } = this.props;
        const snackOpen = !!(submit && skillLinked);
        let skillNames = [];
        if (list) {
            skillNames = _.flatMap(list, skill => skill.name);
        }
        return (
            <Paper style={{ margin: '.2rem', padding: '1rem' }}>
                <h3>Ranger les compétences par domaine</h3>
                <div style={{ float: 'left' }}>
                    <AutoComplete
                        floatingLabelText="Compétence à ranger"
                        hintText="Chercher la compétence"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={skillNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onSkillChange} />
                </div>
                <div>
                    <SelectField floatingLabelText="Domaine" value={domainId} hintText="Choisir le domaine cible"
                                 onChange={::this.changeDomain}>
                        {domainList.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                     primaryText={domain.name} />)}
                    </SelectField>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <RaisedButton
                        label="Valider"
                        primary={true}
                        onClick={::this.linkSkillToDomain}
                        disabled={_.isNull(skillId) || _.isNull(domainId)} />
                </div>
                <Snackbar
                    bodyStyle={{ backgroundColor: '#008500' }}
                    open={snackOpen}
                    message={`Compétence ${this.state.skillName} rangée dans le domaine ${this.state.domainName}.`}
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000} />
            </Paper>
        );
    }
}

export default LinkSkillToDomain;