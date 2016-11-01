import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";

class ManagerItem extends Component {
    render() {
        const {manager} = this.props;
        return (
            <Paper>
                <div className="manager-container">
                    <span className="manager">{manager.manager.name} ({manager.users.length})</span>
                    {
                        manager.users.map((user, index) => (
                            <p className="user" key={index}>{user.name}</p>)
                        )
                    }
                </div>
            </Paper>
        )
    }
}
export default ManagerItem;