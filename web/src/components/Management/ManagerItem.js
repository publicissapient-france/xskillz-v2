import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";
import moment from 'moment';

class ManagerItem extends Component {
    render() {
        const {manager, onUserClick} = this.props;
        return (
            <Paper>
                <div className="manager-container">
                    <div
                      className="manager"
                      onClick={()=>onUserClick(manager.manager.readable_id)}
                    >
                      <span>{manager.manager.name || 'Pas de manageur assigné'} ({manager.users.length})</span>
                    </div>
                    <p className="manager_table_header">
                      <span>Managé</span>
                      <span>Nombre de skills</span>
                      <span>Dernier ajout de skill</span>
                    </p>
                    {
                        manager.users.map((user, index) => (
                            <div className="manager_table_row" key={index} onClick={()=>onUserClick(user.readable_id)}>
                                <span>{user.name}</span>
                                <span>{user.skill_count}</span>
                                <span>{moment(user.last_skill_update).format('DD/MM/YYYY')}</span>
                            </div>)
                        )
                    }
                </div>
            </Paper>
        )
    }
}
export default ManagerItem;