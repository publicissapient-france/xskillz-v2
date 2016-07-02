import { connect } from 'react-redux';

import MeContent from '../../components/Me/MeContent';

import { fetchMe } from '../../actions/action.me';
import { fetchSkills, addSkill, updateSkill, removeSkill } from '../../actions/skills';

const mapStateToProps = state => {
    return {
        me: state.me,
        skills: state.skills
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMe: () => dispatch(fetchMe()),
        fetchSkills: () => dispatch(fetchSkills()),
        addSkill: skill => dispatch(addSkill(skill)),
        updateSkill: skill => dispatch(updateSkill(skill)),
        removeSkill: id => dispatch(removeSkill(id))
    };
};

const MePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MeContent);

export default MePage;