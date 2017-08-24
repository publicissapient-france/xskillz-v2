import React, { Component, PropTypes } from 'react';
import { AutoComplete, Paper, RaisedButton, Snackbar } from 'material-ui'

import _ from 'lodash';

class MergeSkills extends Component {

    static propTypes = {
        skills: PropTypes.array.isRequired,
        mergeSkills: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { fromId: null, toId: null, submit: false, snackOpen: false };
    }

    mergeSkills = () => {
        this.setState({ snackOpen: false, submit: true });
        return this.props.mergeSkills({ from: this.state.fromId, to: this.state.toId });
    };

    onSnackClose = () => this.setState({ snackOpen: false, submit: false });

    onFromNewRequest = (name, index) => index >= 0 && this.setState({ fromId: this.props.skills.list[index].id });

    onToNewRequest = (name, index) => index >= 0 && this.setState({ toId: this.props.skills.list[index].id });

    render() {
        const { skills: { list, skillsMerged } } = this.props;
        let { fromId, toId, submit, snackOpen } = this.state;
        if (submit && skillsMerged) {
            snackOpen = true;
        }
        let skillNames = [];
        if (list) {
            skillNames = _.flatMap(list, skill => skill.name);
        }
        return (
            <Paper style={{ margin: '.2rem', padding: '1rem' }}>
                <h3>Fusionner deux compétences</h3>
                <div style={{ float: 'left' }}>
                    <AutoComplete
                        floatingLabelText="Remplacer la compétence"
                        hintText="Chercher la compétence"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={skillNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onFromNewRequest} />
                </div>
                <div>
                    <AutoComplete
                        floatingLabelText="Par"
                        hintText="Chercher la compétence"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={skillNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onToNewRequest} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <RaisedButton
                        label="Valider"
                        primary={true}
                        onClick={::this.mergeSkills}
                        disabled={_.isNull(fromId) || _.isNull(toId)} />
                </div>
                <Snackbar
                    bodyStyle={{ backgroundColor: '#008500' }}
                    open={snackOpen}
                    message="Compétences fusionnées avec succès"
                    onRequestClose={::this.onSnackClose}
                    autoHideDuration={3000} />
            </Paper>
        );
    }
}

export default MergeSkills;