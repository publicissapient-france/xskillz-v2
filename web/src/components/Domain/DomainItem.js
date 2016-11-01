import React, {Component, PropTypes} from "react";

class DomainItem extends Component {
    render() {
        const {domain, onSkillClick} = this.props;

        return (
            <div className="domains-content">
                <div className={`domain-name domain-${domain.info.name}`} style={{color: domain.info.color}}>{domain.info.name}</div>
                <div className="skills-content">
                    {
                        domain.skills.map((skill, index) =>
                            (
                                <div key={index} className="skill" onClick={()=>{onSkillClick(skill.name)}}>
                                    {skill.name},
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}
export default DomainItem;