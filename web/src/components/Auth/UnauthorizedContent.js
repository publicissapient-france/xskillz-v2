import React, {Component, PropTypes} from "react";

import Forbidden from './forbidden.svg'

import './UnauthorizedContent.less';

class SigninContent extends Component {

    render() {
        return (
            <div className="unauthorized">
                <img src={Forbidden}/>
            </div>
        )
    }

}

export default SigninContent;