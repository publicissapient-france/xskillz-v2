import React, {Component, PropTypes} from 'react';
import UserItem from '../Users/UserItem';

import AddSkillForm from './AddSkillForm';
import ProfileForm from './ProfileForm';

class MeContent extends Component {

    componentDidMount() {
        const me = this.props.me;
        if (!me.loaded) {
            this.props.fetchMe();
        }
    }

    render() {
        const user = this.props.me;
        const {updateSkill, removeSkill, updateProfile} = this.props;

        return (
            <div className="content">
                <ProfileForm updateProfile={updateProfile} user={user}/>
                <AddSkillForm
                    skills={this.props.skills}
                    fetchSkills={this.props.fetchSkills}
                    addSkill={this.props.addSkill}/>
                <UserItem user={user}
                          onUserClick={()=> {
                          }}
                          onSkillClick={this.props.onSkillClick}
                          updateSkill={updateSkill}
                          removeSkill={removeSkill}
                          details/>
            </div>
        );
    }
}

MeContent.propTypes = {
    fetchMe: PropTypes.func.isRequired,
    me: PropTypes.object.isRequired,
    skills: PropTypes.object.isRequired,
    fetchSkills: PropTypes.func.isRequired,
    addSkill: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
};

export default MeContent;