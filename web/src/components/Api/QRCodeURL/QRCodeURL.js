import React, { Component, PropTypes } from 'react';

import QRCode from 'qrcode.react';

import './QRCodeURL.less';

class QRCodeAPI extends Component {

    static PropTypes = {
        url: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="qr-code-url">
                <h2>QR Code API URL</h2>
                <div>
                    <QRCode value={this.props.url}/>
                </div>
            </div>
        );
    }
}

export default QRCodeAPI;