import {connect} from 'react-redux';

import MeContent from '../../components/Me/MeContent';
import {browserHistory} from "react-router";

import {fetchMe, updateProfile} from '../../actions/action.me';
import {fetchSkills, addSkill, updateSkill, removeSkill} from '../../actions/skills';
import {changePassword} from '../../actions/action.me';

const mapStateToProps = state => {
    return {
        me: state.me,
        skills: state.skills,
        onSkillClick: name => browserHistory.push(`/skills?name=${name}`)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMe: () => dispatch(fetchMe()),
        fetchSkills: () => dispatch(fetchSkills()),
        addSkill: skill => dispatch(addSkill(skill)),
        updateSkill: skill => dispatch(updateSkill(skill)),
        removeSkill: id => dispatch(removeSkill(id)),
        updateProfile: profile => dispatch(updateProfile(profile)),
        changePassword: (oldPwd, newPwd) => dispatch(changePassword(oldPwd, newPwd))
    };
};

const MePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MeContent);

export default MePage;