import React, {Component} from "react";

import Paper from 'material-ui/Paper';

class DomainItem extends Component {
    render() {
        const {domain, onSkillClick} = this.props;

        return (
            <Paper style={{margin: '.5em', padding: '10px'}}>
                <h3 className={`domain-name domain-${domain.info.name}`} style={{color: domain.info.color}}>
                    {domain.info.name}
                </h3>
                <div className="" style={{marginTop: 10}}>
                    {domain.skills.map((skill, index) =>
                        <div key={index} className="skill" onClick={() => {onSkillClick(skill.name)}}>
                            {skill.name}
                        </div>
                    )}
                </div>
            </Paper>
        )
    }
}
export default DomainItem;