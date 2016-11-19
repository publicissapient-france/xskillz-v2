import React, {Component, PropTypes} from "react";
import Card from "material-ui/Card";

import Forbidden from './forbidden.svg'

import './UnauthorizedContent.less';

class SigninContent extends Component {

    static propTypes = {};

    render() {

        const style = {
            card: {padding: '4rem 1rem 3rem 1rem'},
            button: {width: '10rem', margin: 'auto'},
            input: {display: 'none'}
        };

        return (
            <div className="unauthorized">
                <img src={Forbidden}/>
            </div>
        )
    }

}

export default SigninContent;