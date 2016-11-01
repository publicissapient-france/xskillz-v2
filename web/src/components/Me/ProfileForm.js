import React, {Component, PropTypes} from 'react';

import validator from 'validator';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Geosuggest from 'react-geosuggest';

import _ from 'lodash';

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
        const profile = {};
        if (this.state.isPhoneValid && this.state.phone.length > 0) {
            profile.phone = this.state.phone;
        }
        if (this.state.isAddressValid) {
            profile.address = this.state.address;
        }
        if (!_.isEmpty(profile)) {
            this.props.updateProfile(profile);
        }
    };

    selectAddress = suggest => {
        this.setState({
            address: {
                label: suggest.label,
                lat: suggest.location.lat,
                lng: suggest.location.lng
            },
            isAddressValid: true
        });
    };

    render() {
        const {phone, isPhoneValid} = this.state;
        const errorPhone = isPhoneValid ? '' : 'Numéro invalide';
        const address = this.props.user.address;
        const fixtures = [{label: 'Xebia', location: {lat: 48.8755622, lng: 2.3088289}}];
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
                        <div className="geosuggest-content">
                            <span className="label">Adresse d'activité</span>
                            <Geosuggest
                                placeholder="Adresse d'activité"
                                country="fr"
                                onSuggestSelect={::this.selectAddress}
                                initialValue={address ? address.label : null}
                                fixtures={fixtures}/>
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