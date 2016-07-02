import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { grey300 } from 'material-ui/styles/colors';

class Stars extends Component {

    static propTypes = {
        level: PropTypes.number.isRequired,
        onStarClick: PropTypes.func,
        onStarClicked: PropTypes.func
    };

    onStarClicked(event) {
        const onStarClicked = this.props.onStarClicked;
        if (typeof onStarClicked === 'function') {
            const star = Number(event.currentTarget.getAttribute('data'));
            switch (star) {
                case 1:
                    onStarClicked(1);
                    break;
                case 2:
                    onStarClicked(1);
                    break;
                case 3:
                    onStarClicked(2);
                    break;
                case 4:
                    onStarClicked(2);
                    break;
                case 5:
                    onStarClicked(3);
                    break;
                default:
                    onStarClicked(0);
                    break;
            }
        }
    }

    render() {
        const level = this.props.level;
        const gold = {
            color: 'gold'
        };
        const grey = {
            color: grey300
        };

        return (
            <div>
                {level > 0 ?
                    <span style={gold} onClick={::this.onStarClicked} data="0">&#x2605;</span> :
                    <span style={grey} onClick={::this.onStarClicked} data="1">&#x2605;</span>}
                {level > 1 ?
                    <span style={gold} onClick={::this.onStarClicked} data="2">&#x2605;</span> :
                    <span style={grey} onClick={::this.onStarClicked} data="3">&#x2605;</span>}
                {level > 2 ?
                    <span style={gold} onClick={::this.onStarClicked} data="4">&#x2605;</span> :
                    <span style={grey} onClick={::this.onStarClicked} data="5">&#x2605;</span>}
            </div>
        );
    }
}

export default Stars;