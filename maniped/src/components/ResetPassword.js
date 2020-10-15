import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import * as qs from 'qs';

import { resetPasswordFin } from '../actions/authActions.js';
import './Login.css';

let registrationSchema = yup.object().shape({
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must have at least 8 1 upper case letter, at least 1 lower case letter, at least 1 number, and at least 1 special character ').required('Password is required'),
    verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            verifyPassword: '',
            validationError: {inner: []}
        }
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const validationBody = {password: this.state.password, verifyPassword: this.state.verifyPassword};
        const putBody = {password: this.state.password};
        registrationSchema.validate(validationBody, {abortEarly: false})
        .then(async d => {
            if (d) {
            
            const id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).manid;
            const t = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).t;
            console.log(t)
            localStorage.setItem('token', t);
            await this.props.resetPasswordFin(id, putBody);
            
            if (this.props.passwordReset.request.status === 200) {
                
                this.setState({
                    password: '',
                    verifyPassword: ''
                })
                window.confirm("Your password has been reset. Now you can log in.  Thank you for choosing maniPed for your cosmetic needs!");
                this.props.history.push('/login')
            } else {
            this.setState({
                password: '',
                verifyPassword: ''
            })
            window.confirm("There was an error resetting your password.  Please try again later.  Boolean thunder error 55-465.c");
            
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
                <form className='fUCont' type='submit' onSubmit={this.handleSubmit}>
                    <p>Enter your email associated with your account here, and if there is an account associated with that email, we will send you an email with the next steps.</p>
                    <input
                    className='twoFive'
                    type='password'
                    onChange={this.handleChange}
                    name='password'
                    value={this.state.password}
                    placeholder='password'
                    />
                    {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Password is required").length > 0 ?  <div className="ErrorB">PASSWORD IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                    {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Password must have at least 8 1 upper case letter, at least 1 lower case letter, at least 1 number, and at least 1 special character ").length > 0 ?  <div className="Error">REPEAT: USE AT LEAST 1 UPPER CASE, 1 LOWER CASE, 1 NUMBER, 1 SPECIAL CHARACTER RE-ENTER AND CLICK SIGN UP</div> : null}
                    {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Passwords must match").length > 0 ?  <div className="ErrorB">PASSWORDS MUST MATCH, RE-ENTER AND CLICK SIGN UP</div> : null} 
                    <label>Verify password here:</label>
                    <input 
                    type='password'
                    name='verifyPassword'
                    value={this.state.verifyPassword}
                    placeholder='verify password'
                    onChange={this.handleChange}
                    />
                    <button className='twoFive'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        passwordReset: state.loginReducer.passwordReset
    }
}

export default connect(mapStateToProps, { resetPasswordFin })(ResetPassword);