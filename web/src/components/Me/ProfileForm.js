import React, {Component, PropTypes} from 'react';

import validator from 'validator';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './ProfileForm.less';

class ProfileForm extends Component {

    static propTypes = {
        updateProfile: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {phone: '', isPhoneValid: true};
    }

    setPhone = event => {
        const phone = event.currentTarget.value;
        this.setState({phone});
        if (validator.isMobilePhone(event.currentTarget.value, 'fr-FR')) {
            this.setState({isPhoneValid: true});
        }
    };

    checkPhone = event => {
        if (validator.isMobilePhone(event.currentTarget.value, 'fr-FR')) {
            this.setState({isPhoneValid: true});
        } else {
            this.setState({isPhoneValid: false});
        }
    };

    submitProfile = () => {
        if (this.state.isPhoneValid && this.state.phone.length > 0) {
            this.props.updateProfile({phone: this.state.phone});
        }
    };

    render() {
        const {phone, isPhoneValid} = this.state;
        const errorPhone = isPhoneValid ? '' : 'Numéro invalide';
        return (
            <div className="profile-form">
                <Paper>
                    <div className="content">
                        <div>
                            <TextField value={phone || this.props.user.phone} hintText="0600000000"
                                       errorText={errorPhone}
                                       floatingLabelText="Téléphone"
                                       onChange={::this.setPhone}
                                       onBlur={::this.checkPhone}/>
                        </div>
                        <div className="button">
                            <RaisedButton primary label="Sauvegarder" onClick={::this.submitProfile}/>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default ProfileForm;