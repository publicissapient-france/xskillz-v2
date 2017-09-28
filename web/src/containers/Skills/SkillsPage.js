import React, { Component } from 'react';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SkillsContent from '../../components/Skills/SkillsContent'

import { fetchSkills, updateSkillDefinition } from '../../actions/skills';
import { fetchUsersBySkill } from '../../actions/users';

const mapStateToProps = (state) => {
    return {
        skills: state.skills,
        users: state.users
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSkills: () => dispatch(fetchSkills()),
        fetchUsersBySkillId: (id, name) => {
            dispatch(fetchUsersBySkill(id));
            browserHistory.push(`/skills?name=${encodeURIComponent(name)}`);
        },
        onUserClick: id => browserHistory.push(`/user/${id}`),
        updateSkillDefinition: (skillId, description) => {
            dispatch(updateSkillDefinition(skillId, description));
        }
    };
};

const SkillsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SkillsContent);

export default SkillsPage;