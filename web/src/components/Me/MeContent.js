import React, {Component, PropTypes} from "react";
import UserItem from "../Users/UserItem";
import AddSkillForm from "./AddSkillForm";
import SaleCard from "./SaleCard";
import ProfileForm from "./ProfileForm";
import {Tabs, Tab} from "material-ui/Tabs";
import Snackbar from "material-ui/Snackbar";
import {hasRole, CARD} from '../../services/permissions';

class MeContent extends Component {

    componentDidMount() {
        const me = this.props.me;
        if (!me.loaded) {
            this.props.fetchMe();
        }
    }

    render() {
        const user = this.props.me;
        const {updateSkill, removeSkill, updateProfile, changePassword, updateSocial} = this.props;
        return (
            <div className="content">
                <Tabs>
                    <Tab label="Compétences">
                        <AddSkillForm
                            skills={this.props.skills}
                            fetchSkills={this.props.fetchSkills}
                            addSkill={this.props.addSkill}/>
                        <UserItem user={user}
                                  onUserClick={() => {
                                  }}
                                  onSkillClick={this.props.onSkillClick}
                                  updateSkill={updateSkill}
                                  removeSkill={removeSkill}
                                  details/>
                        <Snackbar
                            bodyStyle={{backgroundColor: '#CC0000'}}
                            open={this.shouldWarnAboutDefaultPassword()}
                            message="Veuillez changez votre mot de passe immédiatement (Onglet INFO)."
                        />
                    </Tab>
                    <Tab label="Info">
                        <ProfileForm updateProfile={updateProfile} user={user}
                                     changePassword={changePassword}/>
                    </Tab>
                    {hasRole(CARD) &&
                    <Tab label="Carte">
                        <SaleCard user={user}/>
                    </Tab>
                    }
                </Tabs>
            </div>
        );
    }

    shouldWarnAboutDefaultPassword() {
        if (!this.props.me.loaded || this.alreadyWarned) {
            return false;
        }
        this.alreadyWarned = true;
        return !!this.props.me.default_password;
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