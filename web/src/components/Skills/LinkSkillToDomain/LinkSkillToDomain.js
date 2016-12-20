import React, {Component, PropTypes} from "react";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import _ from "lodash";
import AutoComplete from "material-ui/AutoComplete";
import Snackbar from "material-ui/Snackbar";

class LinkSkillToDomain extends Component {

    static propTypes = {
        domains: PropTypes.array.isRequired,
        skills: PropTypes.array.isRequired,
        linkSkillToDomain: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {skillId: null, domainId: null, submit: false};
    }

    changeDomain = (event, index, value) => this.setState({domainId: value, domainName: this.props.domains[index].name});

    linkSkillToDomain = () => {
        this.setState({submit: true});
        const {skillId, domainId} = this.state;
        this.props.linkSkillToDomain({skill: {id: skillId}, domain: {id: domainId}});
    };

    onSkillChange = (name, index) => {
        if (index >= 0) {
            this.setState(
                {
                    skillId: this.props.skills[index].id,
                    skillName: this.props.skills[index].name
                });
        }
    };

    render() {
        const {domains, skills} = this.props;
        const {domainId, skillId} = this.state;
        let skillNames = [];
        if (skills) {
            skillNames = _.flatMap(skills, skill => skill.name);
        }
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Ranger les compétences par domaine</h3>
                <div style={{float: 'left'}}>
                    <AutoComplete
                        floatingLabelText="Compétence à ranger"
                        hintText="Chercher la compétence"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={skillNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onSkillChange}/>
                </div>
                <div>
                    <SelectField floatingLabelText="Domaine" value={domainId} hintText="Choisir le domaine cible"
                                 onChange={::this.changeDomain}>
                        {domains.map((domain, index) => <MenuItem value={domain.id} key={index}
                                                                  primaryText={domain.name}/>)}
                    </SelectField>
                </div>
                <div style={{marginTop: '1rem'}}>
                    <RaisedButton
                      label="Valider"
                      primary={true}
                      onClick={::this.linkSkillToDomain}
                      disabled={_.isNull(skillId) || _.isNull(domainId)}/>
                </div>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={this.state.submit}
                    message={`Compétence ${this.state.skillName} rangée dans le domaine ${this.state.domainName}.`}
                    autoHideDuration={3000}/>
            </Paper>
        );
    }
}

export default LinkSkillToDomain;