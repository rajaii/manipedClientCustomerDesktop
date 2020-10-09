import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';

//make this componenet
//upon completing the action call history.push to login
//make an action to post to route http://localhost:4000/api/auth/forgotusername
//make a section in authreducer that can simply show that the action occured boolean

class ForgotUserName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                forgot
            </div>
        )
    }
}

export default connect(null, {})(ForgotUserName);