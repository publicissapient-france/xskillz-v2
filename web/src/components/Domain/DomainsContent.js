import React, {Component, PropTypes} from "react";
import CircularProgress from "material-ui/CircularProgress";
import DomainItem from "./DomainItem";

class DomainsContent extends Component {
    componentDidMount() {
        this.props.fetchDomainsWithSkills();
    }
    render() {
        const {loaded, domains} = this.props.domains;
        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }
        return (
            <div className="domains">
                {
                    domains && domains.map((domain, index) => (
                        <DomainItem domain={domain} key={index} onSkillClick={this.props.onSkillClick} />))
                }
            </div>
        )
    }
}
export default DomainsContent;