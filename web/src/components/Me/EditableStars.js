import React, { Component, PropTypes } from 'react';

class EditableStars extends Component {

    static propTypes = {
        mark: PropTypes.number.isRequired,
        handleClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            mark: props.mark ? props.mark : 0
        };
    }

    setMark(mark) {
        this.setState({
            mark
        });
    }

    handleClick(mark) {
        this.setMark(mark);
        if (this.props.handleClick) {
            this.props.handleClick(mark);
        }
    }

    render() {
        const { mark } = this.state;

        return (
            <div className="stars-content">
                <div className={mark >= 1 ? 'star-ok' : 'star-ko'} onClick={() => this.handleClick(1)}></div>
                <div className={mark >= 2 ? 'star-ok' : 'star-ko'} onClick={() => this.handleClick(2)}></div>
                <div className={mark >= 3 ? 'star-ok' : 'star-ko'} onClick={() => this.handleClick(3)}></div>
            </div>
        );
    }
}

export default EditableStars;