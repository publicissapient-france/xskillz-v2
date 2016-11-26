import React, {Component, PropTypes} from "react";
import _ from "lodash";
import moment from "moment";
import Chip from "material-ui/Chip";
import Paper from "material-ui/Paper";
import "./SaleCard.less";

const styles = {
    domain: {
        marginRight: '5px',
        display: 'inline-block',
        lineHeight: '1.5em'
    },
    domainName: {
        color: 'white',
        fontSize: '1em',
        lineHeight: '1em'
    },
    experience: {
        marginRight: '5px',
        backgroundColor: '#9b59b6',
        display: 'inline-block',
        lineHeight: '1.5em'
    },
    seniority: {
        marginRight: '5px',
        backgroundColor: '#f1c40f',
        display: 'inline-block',
        lineHeight: '1.5em'
    },
    label: {
        fontSize: '1em',
        lineHeight: '1em',
        color: 'white'
    }
};

class SaleCard extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;
        return (
            <div className="sale-card">
                <Paper>
                    <div className="content">
                        <div className="row">
                            <div className="name">
                                {user.name}
                            </div>
                            <div className="date"><b>{moment(user.availability_date).format('DD/MM')}</b></div>
                        </div>
                        <div className="row">
                            <div className="experience">
                                <Chip style={styles.domain} labelStyle={styles.domainName}
                                      backgroundColor={user.domains && user.domains[0].color}>{user.domains && user.domains[0].name}</Chip>
                                <Chip style={styles.domain} labelStyle={styles.domainName}
                                      backgroundColor={user.domains && user.domains[1].color}>{user.domains && user.domains[1].name}</Chip>
                                {user.experienceCounter > 0 &&
                                <Chip style={styles.experience} backgroundColor={styles.experience.backgroundColor}
                                      labelStyle={styles.label}>{user.experienceCounter} XP</Chip>}
                                {user.seniority > 0 &&
                                <Chip style={styles.seniority} backgroundColor={styles.seniority.backgroundColor}
                                      labelStyle={styles.label}>{user.seniority} ans</Chip>}
                            </div>
                            <div>Habite à : </div>
                        </div>
                        <div className="row">
                            <div>Manageur : <b>{user.manager && user.manager.name}</b></div>
                            <div>CV :</div>
                        </div>

                        <div className="row">
                            <div>
                                <p>Compétences</p>
                                <ul className="row-content"></ul>
                            </div>
                            <div>
                                <p>Souhaits</p>
                                <ul className="row-content">{
                                    _(user.domains)
                                        .map(d => d.skills)
                                        .flatten()
                                        .filter(s => s && s.interested)
                                        .orderBy(['name'], ['asc'])
                                        .slice(0, 5)
                                        .map(s => <li key={s.name}>{s.name}</li>)
                                        .value()
                                }
                                </ul>
                            </div>
                            <div>
                                <p>Pistes</p>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default SaleCard;