import React, {Component, PropTypes} from "react";
import CircularProgress from "material-ui/CircularProgress";
import ManagerItem from "./ManagerItem";

class ManagementContent extends Component {
    componentDidMount() {
        this.props.fetchManagement();
    }
    render() {
        const {loaded, management} = this.props.management;
        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }
        return (
            <div className="content">
                {
                    management && management.map((manager, index) => (
                        <ManagerItem manager={manager} key={index} />))
                }
            </div>
        )
    }
}
export default ManagementContent;