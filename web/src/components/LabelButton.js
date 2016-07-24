import React, {Component, PropTypes} from "react";
import FlatButton from "material-ui/FlatButton";

class LabelButton extends Component {

    render() {

        const {label, onClick} = this.props;

        const style = {
            flatButton: {lineHeight: '18px', minWidth: 0},
            labelStyle: {padding: '0 3px'}
        };
        return (
            <FlatButton style={style.flatButton}
                        labelStyle={style.labelStyle}
                        secondary={true}
                        label={label||' '}
                        onClick={onClick}/>
        )
    }

}

export default LabelButton;