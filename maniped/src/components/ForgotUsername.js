import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';

import { sendUsername } from '../actions/authActions.js'

//make this componenet
//upon completing the action call history.push to login
//make an action to post to route http://localhost:4000/api/auth/forgotusername
//make a section in authreducer that can simply show that the action occured boolean

let forgorUsernameSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
  });

class ForgotUserName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            validationError: {inner: []}
        }
    }

    handlechange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getUsername = e => {
        e.preventDefault();
        const body = {email: this.state.email}
        forgorUsernameSchema.validate(body, {abortEarly: false})
        .then(async d => {
            if (d) {
            
            await this.props.sendUsername(body);
            this.setState({
                email: ''
            })
            
            
            this.props.history.push('/login')
            
        }})
        .catch(err => {
             console.log(err)
             this.setState({
                validationError: err
            })
        })
    }
 
    render() {
        return (
            <div>
                <form type='submit' onSubmit={this.getUsername}>
                    <input
                    type='text'
                    onChange={this.handlechange}
                    name='email'
                    value={this.state.email}
                    />
                    {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Email is required").length > 0 ?  <div className="Error">EMAIL IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                    {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Please enter a valid email").length > 0 ?  <div className="Error">MUST BE A VALID EMAIL RE-ENTER AND CLICK SIGN UP</div> : null}
                    <button>Get username</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { sendUsername })(ForgotUserName);