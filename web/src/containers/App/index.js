import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UpdateHint from '../../UpdateHint/UpdateHint';

import '../../styles/main';

export class App extends Component {

    render() {
        const {header, main, footer} = this.props;
        const {dataTypePage} = this.props.main.props.route;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div id="container" data-page-type={dataTypePage}>
                    {header}
                    {footer}
                    {main}
                    <UpdateHint/>
                    <div id="additional-layer"></div>
                </div>
            </MuiThemeProvider>
        );
    }
}
