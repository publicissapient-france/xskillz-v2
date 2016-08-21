import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

import QRCode from 'qrcode.react';

class QRCodeAPI extends Component {

    static PropTypes = {
        url: PropTypes.string.isRequired
    };

    render() {
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>QR Code API URL</h3>
                <div style={{marginTop: '1rem'}}>
                    <QRCode value={this.props.url}/>
                </div>
            </Paper>
        );
    }
}

export default QRCodeAPI;