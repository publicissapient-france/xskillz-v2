import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import UpdateItem from './UpdateItem';

class UpdatesContent extends Component {

    componentDidMount() {
        this.props.fetchUpdatesByCompany(1);
    }

    render() {

        const { loaded, list } = this.props.updates;
        const { onUserClick, onSkillClick } = this.props;

        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }

        const max = 20;
        const maxUpdates = list.length > max ? max : list.length;
        return (
            <div className="content">
                {list.slice(0, maxUpdates).map((update, index)=> {
                    return (
                        <UpdateItem update={update} key={index} onUserClick={onUserClick}
                                    onSkillClick={onSkillClick}/>
                    );
                })}
            </div>
        )
    }

}

export default UpdatesContent;