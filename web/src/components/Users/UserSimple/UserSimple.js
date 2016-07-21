import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {redA400, grey500} from 'material-ui/styles/colors';

import LabelButton from '../../LabelButton';

class UserSimple extends Component {

    static propTypes = {
        onUserClick: PropTypes.func
    };

    onUserClick = id => {
        const userClick = this.props.onUserClick;
        if (typeof userClick === 'function') {
            userClick(id);
        }
    };

    render() {

        const {user} = this.props;

        //noinspection JSUnresolvedVariable
        return (
            <div className={"user-row user-interested-"+user.interested}>
                <Paper>
                    <div className={"user-content"}>
                        <div className="user-left">
                            <Avatar src={user.gravatarUrl} size={75}/>
                        </div>
                        <div className="user-right">
                            {user.name && <p>
                                <LabelButton label={user.name} onClick={()=>{::this.onUserClick(user.id)}}/>
                            </p>}
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }

}

export default UserSimple;