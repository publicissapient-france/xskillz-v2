import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SocialForm extends Component {

    static propTypes = {
        user: PropTypes.object,
        updateSocial: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = { linkedIn: '', twitter: '', github: '' }
    }

    setLinkedIn = event => this.setState({ linkedIn: event.currentTarget.value });

    setTwitter = event => this.setState({ twitter: event.currentTarget.value });

    setGithub = event => this.setState({ github: event.currentTarget.value });

    submitSocial = event => {
        event.preventDefault();
        const { linkedIn, twitter, github } = this.state;
        this.props.updateSocial({ linkedIn, twitter, github });
    };

    render() {
        let { linkedIn, twitter, github } = this.state;
        linkedIn = linkedIn || this.props.user.linked_in || '';
        twitter = twitter || this.props.user.twitter || '';
        github = github || this.props.user.github || '';
        return (
            <Paper style={{ margin: '.5em', padding: '10px' }}>
                <h3>réseaux sociaux</h3>
                <form>
                    <div>
                        <TextField value={linkedIn} hintText="john-doe"
                                   floatingLabelText="Identifiant LinkedIn"
                                   onChange={this.setLinkedIn} />
                    </div>
                    <div>
                        <TextField value={twitter} hintText="john-doe"
                                   floatingLabelText="Identifiant Twitter"
                                   onChange={this.setTwitter} />
                    </div>
                    <div>
                        <TextField value={github} hintText="john-doe"
                                   floatingLabelText="Identifiant Github"
                                   onChange={this.setGithub} />
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <RaisedButton label="Sauvegarder" primary={true} onClick={::this.submitSocial} />
                    </div>
                </form>
            </Paper>
        )
    }

}

export default SocialForm;