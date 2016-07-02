import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

class UpdateItem extends Component {

    render() {

        const { label, onClick } = this.props;

        const style = {
            flatButton: {lineHeight: '18px', minWidth: 0},
            labelStyle: {padding: '0 3px'}
        };

        return (
            <FlatButton style={style.flatButton}
                        labelStyle={style.labelStyle}
                        secondary={true}
                        label={label}
                        onClick={onClick}/>
        )
    }

}

export default UpdateItem;