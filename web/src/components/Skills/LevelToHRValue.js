import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { deepPurple300, purple300, pink300 } from 'material-ui/styles/colors';

class LevelToHRValue extends Component {

    render() {

        const style = {
            beginner: {
                fontStyle: 'italic'
            },
            confirmed: {
                fontStyle: 'italic'
            },
            expert: {
                fontStyle: 'italic'
            }
        };

        const level = this.props.level;

        var wording;

        switch (level) {
            case 0:
                wording = <span style={style.beginner}>débutant</span>;
                break;
            case 1:
                wording = <span style={style.confirmed}>confirmé</span>;
                break;
            default:
                wording = <span style={style.expert}>expert</span>;
                break;
        }

        return (
            <span>{wording}</span>
        )
    }

}

export default LevelToHRValue;