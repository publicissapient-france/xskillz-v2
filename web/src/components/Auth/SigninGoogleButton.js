import React, { Component, PropTypes } from 'react';

const gApiConfig = {
    client_id: '197689696095-r3nte77lvj6gs2kur7uordeov7kbh7f6.apps.googleusercontent.com'
};

class SigninGoogleButton extends Component {

    constructor(props) {
        super(props);

        this.onSignin = this.onSignin.bind(this);
        this.initGApi = this.initGApi.bind(this);
        this.loadGApi = this.loadGApi.bind(this);

        this.scriptAddedToHead = false;
    }

    onSignin(googleUser) {
        //noinspection JSUnresolvedFunction
        this.props.apiSignin(googleUser.getBasicProfile().getEmail());
    }

    initGApi() {
        if (!window.gapi) {
            if (!this.scriptAddedToHead) {
                this.loadGApi();
                this.scriptAddedToHead = true;
            }
            setTimeout(this.initGApi, 100);
            return;
        }
        window.gapi.signin2.render('g-signin2', {
            'scope': 'email',
            'theme': 'light',
            'onsuccess': this.onSignin
        });
    }

    loadGApi() {
        var script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;

        var meta = document.createElement('meta');
        meta.name = 'google-signin-client_id';
        meta.content = gApiConfig.client_id;

        document.head.appendChild(meta);
        document.head.appendChild(script);
    }

    componentDidMount() {
        this.initGApi();
    }

    render() {

        return (
            <div style={{margin: 'auto', width: '120px'}} id="g-signin2"></div>
        )
    }

}

export default SigninGoogleButton;