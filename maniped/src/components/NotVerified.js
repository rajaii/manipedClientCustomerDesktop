import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';

import { resendVerification } from '../actions/authActions.js';
import './Login.css';



let forgotUsernameSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
  });

class NotVerified extends React.Component {
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


    resendVerification = e => {
        e.preventDefault();
        const body = {email: this.state.email}
        forgotUsernameSchema.validate(body, {abortEarly: false})
        .then(async d => {
            if (d) {
            
            let sent = await this.props.resendVerification(body);
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
            window.confirm("If there is an email associated with the entered email address, an email has been sent with instructions to verify your account. Thank you for choosing maniPed for your cosmetic needs!");
            
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
                <form className='fUCont' type='submit' onSubmit={this.resendVerification}>
                    <h1 className='verWarn'>You have not verified your account yet.  Please log in to your email associated with your account and follow the instructions in the email we sent.  If you do not have the email then enter your email below and we will send you another email with further instructions.</h1>
                    <p>Enter your email associated with your account here, and if there is an account associated with that email, we will send you an email with the next steps.</p>
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
                    <button className='twoFive'>Resend Verification Email</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { resendVerification })(NotVerified);