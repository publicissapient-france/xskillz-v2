import React, {Component} from 'react';

import QRCodeURL from './QRCodeURL/QRCodeURL';
import Config from '../../Config';

class Api extends Component {
    render() {
        return (
            <QRCodeURL url={Config.apiURL}/>
        );
    }
}

export default Api;