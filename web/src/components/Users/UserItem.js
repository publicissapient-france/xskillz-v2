import React, {Component, PropTypes} from "react";
import moment from 'moment';

import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import FlatButton from "material-ui/FlatButton";
import FontIcon from 'material-ui/FontIcon';

import LabelButton from "../LabelButton";
import SkillCard from "../Skills/SkillCard";
import {Tabs, Tab} from "material-ui/Tabs";
import SaleCard from '../Me/SaleCard';

import {hasRole, CARD} from '../../services/permissions'

import "./UserItem.less";

const styles = {
    domainName: {
        marginRight: '5px',
        color: 'white',
        display: 'inline-block'
    },
    experience: {
        marginRight: '5px',
        color: 'white',
        display: 'inline-block'
    },
    seniority: {
        marginRight: '5px',
        color: 'white',
        display: 'inline-block'
    }
};

class UserItem extends Component {

    renderSocial = () => {
        const {twitter, linked_in, github} = this.props.user;
        let render = '';
        if (twitter || linked_in || github) {
            render = (
                <div>
                    {linked_in && <FlatButton
                        href={`https://www.linkedin.com/in/${linked_in}`}
                        icon={<LinkedInIcon/>}
                        target="_blank"/>}
                    {twitter && <FlatButton
                        href={`https://twitter.com/${twitter}`}
                        icon={<TwitterIcon/>}
                        target="_blank"/>}
                    {github && <FlatButton
                        href={`https://github.com/${github}`}
                        icon={<GithubIcon/>}
                        target="_blank"/>}
                </div>
            )
        }
        return render;
    };

    render() {
        const user = this.props.user;
        const {onUserClick, onSkillClick, updateSkill, removeSkill, details, showSocial=true} = this.props;
        const userDetails = /^\/user\/.*$/.test(window.location.pathname);

        let competencies = '';
        if (user.domains && details) {
            competencies = (
                <div style={{paddingBottom: '.1rem'}}>
                    {user.domains.map((domain, index) => {
                        return (
                            <div key={index} className={'domains-content'}
                                 style={{backgroundColor: domain.color}}>
                                <div className={`domain-name domain-${domain.name}`}
                                     style={{color: domain.color}}>{domain.name || 'Sans domaine'}</div>
                                <div className="skills-content">
                                    {domain.skills.map((skill, index) => {
                                        // noinspection JSUnresolvedVariable
                                        return (
                                            <SkillCard updateSkill={updateSkill} key={index}
                                                       skill={skill}
                                                       onSkillClick={onSkillClick}
                                                       removeSkill={removeSkill}/>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        let competenciesAndCard = competencies;
        if (hasRole(CARD) && userDetails) {
            competenciesAndCard = (
                <Tabs>
                    <Tab label="Compétences">
                        {competencies}
                    </Tab>
                    <Tab label="Carte">
                        <SaleCard user={user}/>
                    </Tab>
                </Tabs>
            );
        }

        if (user) {
            // noinspection JSUnresolvedFunction
            return (
                <div className="user-row">
                    <Paper style={{marginBottom: '.5em', padding: '10px'}}>
                        <div className="user-content">
                            <div className="user-left">
                                <Avatar src={user.gravatarUrl} size={75} style={{paddingTop: 0}} onClick={() => onUserClick(user.readable_id)}/>
                            </div>
                            <div className="user-right">
                                <p>
                                    <LabelButton label={user.name} onClick={() => onUserClick(user.readable_id)}/>
                                    {user.manager && <span className="managed-by">managé par {user.manager.name}</span>}
                                </p>
                                <div className="user-chips">
                                    {_(user.domains)
                                        .sortBy('score').takeRight(2).reverse().map((domain) =>
                                            <Chip key={domain.id} style={styles.domainName}
                                                  backgroundColor={domain.color} labelStyle={styles.domainName}>
                                                {domain.name || 'Sans domaine'}
                                            </Chip>
                                        ).value()}
                                    {user.experienceCounter > 0 &&
                                    <Chip style={styles.experience} backgroundColor="#9b59b6"
                                          labelStyle={styles.experience}>{user.experienceCounter} XP</Chip>}
                                    {user.seniority > 0 &&
                                    <Chip style={styles.seniority} backgroundColor="#f1c40f"
                                          labelStyle={styles.seniority}>{user.seniority} ans</Chip>}
                                </div>
                            </div>
                        </div>

                        <div className="profile">
                            {user.phone && <div>
                                <FlatButton
                                    href={`tel:${user.phone}`}
                                    label={user.phone}
                                    icon={<FontIcon className="material-icons" color="black">phone</FontIcon>}/>
                            </div>}
                            {user.address && <div>
                                <FlatButton
                                    href={`https://www.google.fr/maps/place/${user.address.label}`}
                                    label={user.address.label}
                                    icon={<FontIcon className="material-icons" color="black">work</FontIcon>}
                                    target="_blank"/>
                            </div>}
                            {user.home && <div>
                                <FlatButton
                                    href={`https://www.google.fr/maps/place/${user.home.label}`}
                                    label={user.home.label}
                                    icon={<FontIcon className="material-icons" color="black">place</FontIcon>}
                                    target="_blank"/>
                            </div>}
                            {user.availability_date && moment(user.availability_date).isAfter(moment.now()) && <div>
                                <FlatButton
                                    label={moment(user.availability_date).format('DD/MM/YY')}
                                    icon={<FontIcon className="material-icons" color="black">access_time</FontIcon>}/>
                            </div>}

                            {showSocial && this.renderSocial()}

                        </div>

                        {competenciesAndCard}

                    </Paper>
                </div>
            );
        }
        return <div></div>;
    }
}

class LinkedInIcon extends Component {
    render() {
        return (
            <svg style={{height: '15px', width: '15px'}} x="0px" y="0px"
                 width="438.536px" height="438.535px" viewBox="0 0 438.536 438.535">
                <g>
                    <g>
                        <rect x="5.424" y="145.895" width="94.216" height="282.932"/>
                        <path d="M408.842,171.739c-19.791-21.604-45.967-32.408-78.512-32.408c-11.991,0-22.891,1.475-32.695,4.427
			c-9.801,2.95-18.079,7.089-24.838,12.419c-6.755,5.33-12.135,10.278-16.129,14.844c-3.798,4.337-7.512,9.389-11.136,15.104
			v-40.232h-93.935l0.288,13.706c0.193,9.139,0.288,37.307,0.288,84.508c0,47.205-0.19,108.777-0.572,184.722h93.931V270.942
			c0-9.705,1.041-17.412,3.139-23.127c4-9.712,10.037-17.843,18.131-24.407c8.093-6.572,18.13-9.855,30.125-9.855
			c16.364,0,28.407,5.662,36.117,16.987c7.707,11.324,11.561,26.98,11.561,46.966V428.82h93.931V266.664
			C438.529,224.976,428.639,193.336,408.842,171.739z"/>
                        <path d="M53.103,9.708c-15.796,0-28.595,4.619-38.4,13.848C4.899,32.787,0,44.441,0,58.529c0,13.891,4.758,25.505,14.275,34.829
			c9.514,9.325,22.078,13.99,37.685,13.99h0.571c15.99,0,28.887-4.661,38.688-13.99c9.801-9.324,14.606-20.934,14.417-34.829
			c-0.19-14.087-5.047-25.742-14.561-34.973C81.562,14.323,68.9,9.708,53.103,9.708z"/>
                    </g>
                </g>
            </svg>
        );
    }
}

class TwitterIcon extends Component {
    render() {
        return (
            <svg style={{height: '15px', width: '15px'}} x="0px" y="0px"
                 width="449.956px" height="449.956px" viewBox="0 0 449.956 449.956">
                <g>
                    <path d="M449.956,85.657c-17.702,7.614-35.408,12.369-53.102,14.279c19.985-11.991,33.503-28.931,40.546-50.819
		c-18.281,10.847-37.787,18.268-58.532,22.267c-18.274-19.414-40.73-29.125-67.383-29.125c-25.502,0-47.246,8.992-65.24,26.98
		c-17.984,17.987-26.977,39.731-26.977,65.235c0,6.851,0.76,13.896,2.284,21.128c-37.688-1.903-73.042-11.372-106.068-28.407
		C82.46,110.158,54.433,87.46,31.403,59.101c-8.375,14.272-12.564,29.787-12.564,46.536c0,15.798,3.711,30.456,11.138,43.97
		c7.422,13.512,17.417,24.455,29.98,32.831c-14.849-0.572-28.743-4.475-41.684-11.708v1.142c0,22.271,6.995,41.824,20.983,58.674
		c13.99,16.848,31.645,27.453,52.961,31.833c-7.995,2.091-16.086,3.138-24.269,3.138c-5.33,0-11.136-0.475-17.416-1.42
		c5.9,18.459,16.75,33.633,32.546,45.535c15.799,11.896,33.691,18.028,53.677,18.418c-33.498,26.262-71.66,39.393-114.486,39.393
		c-8.186,0-15.607-0.373-22.27-1.139c42.827,27.596,90.03,41.394,141.612,41.394c32.738,0,63.478-5.181,92.21-15.557
		c28.746-10.369,53.297-24.267,73.665-41.686c20.362-17.415,37.925-37.448,52.674-60.097c14.75-22.651,25.738-46.298,32.977-70.946
		c7.23-24.653,10.848-49.344,10.848-74.092c0-5.33-0.096-9.325-0.287-11.991C421.785,120.202,437.202,104.306,449.956,85.657z"/>
                </g>
            </svg>
        );
    }
}

class GithubIcon extends Component {
    render() {
        return (
            <svg style={{height: '15px', width: '15px'}} x="0px" y="0px"
                 width="438.549px" height="438.549px" viewBox="0 0 438.549 438.549">
                <g>
                    <path d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
		c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
		c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
		c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
		c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
		c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
		c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
		c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
		c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
		c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
		c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
		c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
		c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
		c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
		c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
		c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
		c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
		c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
		c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
		C438.536,184.851,428.728,148.168,409.132,114.573z"/>
                </g>
            </svg>
        );
    }
}

export default UserItem;