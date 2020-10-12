import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';

import { sendUsername } from '../actions/authActions.js';
import './Login.css';

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
            
            let sent = await this.props.sendUsername(body)
            console.log(sent)
            if (sent != undefined && sent.payload.response.data.message === "user with the specified email does not exist") {
                this.setState({
                    email: ''
                })
                window.confirm("User with the specified email does not exist. Please try again.");
                this.props.history.push('/login')
            } else {
            this.setState({
                email: ''
            })
            window.confirm("If there is an email associated with the entered email address, your username has been sent to the entered email address. Thank you for choosing maniPed for your cosmetic needs!");
            
            this.props.history.push('/login')
        } 
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
                <form className='fUCont' type='submit' onSubmit={this.getUsername}>
                    <p>Enter your email associated with your account here, and if there is an account associated with that email, we will send your username to you.</p>
                    <input
                    className='twoFive'
                    type='text'
                    onChange={this.handlechange}
                    name='email'
                    value={this.state.email}
                    placeholder='email'
                    />
                    {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Email is required").length > 0 ?  <div className="Error">EMAIL IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                    {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Please enter a valid email").length > 0 ?  <div className="Error">MUST BE A VALID EMAIL RE-ENTER AND CLICK SIGN UP</div> : null}
                    <button className='twoFive'>Get username</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { sendUsername })(ForgotUserName);