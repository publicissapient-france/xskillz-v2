import React, { Component, PropTypes } from 'react';
import { red900 } from 'material-ui/styles/colors';

import SigninGoogleButton from './SigninGoogleButton';

class SigninContent extends Component {

    render() {

        const { apiSignin, auth } = this.props;

        var error = '';

        if (auth.tryCount > 0 && auth.success === false) {
            error = 'Error signin: please signin with your company address.';
        }

        return (
            <div style={{marginTop: '30%', textAlign: 'center'}}>
                <SigninGoogleButton apiSignin={apiSignin}/>
                {error && <div style={{color: red900, marginTop: '2rem'}}>{error}</div>}
            </div>
        )
    }

}

export default SigninContent;