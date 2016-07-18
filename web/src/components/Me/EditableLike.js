import React, { Component, PropTypes } from 'react';

import { grey500, redA400 } from 'material-ui/styles/colors';

class EditableLike extends Component {

    static propTypes = {
        like: PropTypes.bool.isRequired,
        handleClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleClick() {
        if (this.props.handleClick) {
            this.props.handleClick(!this.props.like);
        }
    }

    render() {
        const { like } = this.props;

        return (
            <div className="stars-content">
                {like && <span onClick={::this.handleClick} style={{ color: redA400 }}>&#9829;</span>}
                {!like && <span onClick={::this.handleClick} style={{ color: grey500 }}>&#9825;</span>}
            </div>
        );
    }
}

export default EditableLike;