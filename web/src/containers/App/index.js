import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../styles/main';

export class App extends Component {

    render() {
        const { header, main, footer } = this.props;
        const { dataTypePage } = this.props.main.props.route;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div id="container" data-page-type={dataTypePage}>
                    {header}
                    {footer}
                    {main}
                    <div id="additional-layer"></div>
                </div>
            </MuiThemeProvider>
        );
    }
}
