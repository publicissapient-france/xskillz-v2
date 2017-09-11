import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";

class ManagerItem extends Component {
    render() {
        const {manager, onUserClick} = this.props;
        return (
            <Paper>
                <div className="manager-container">
                    <span className="manager" onClick={()=>onUserClick(manager.manager.readable_id)}>{manager.manager.name || 'Pas de manageur assigné'} ({manager.users.length})</span>
                    {
                        manager.users.map((user, index) => (
                            <p className="user" key={index} onClick={()=>onUserClick(user.readable_id)}>{user.name}</p>)
                        )
                    }
                </div>
            </Paper>
        )
    }
}
export default ManagerItem;