import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { connect } from 'react-redux';

import { login } from '../actions/authActions.js';
import './Login.css'; 

let loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    
  });


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            validationError: {inner: []}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit (e) {
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        e.preventDefault();
        loginSchema.validate(this.state, {abortEarly: false})
        .then(async d => {
            if (d) {
            let res = await this.props.login(body)
            if (res != undefined && res.payload.data.message === "please verify your account through your email before logging in...") {
                this.props.history.push('/notverified');
            }
            else {
            this.setState({
                username: '',
                password: ''
            })
            
            
            this.props.history.push('/dashboard')
        }
        }})
        .catch(err => {
             console.log(err)
             this.setState({
                validationError: err
            })
        })
    }

    render () {
        return (
        <div className='loginCont'>
            <form className='loginCont' type='submit' onSubmit={this.handleSubmit}>
                <h1 className="existing">Existing Users Sign In Here:</h1>
                {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Username is required").length > 0 ?  <div className="ErrorB">USERNAME IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                <label>Enter username here:</label>
                <input 
                type='text'
                name='username'
                value={this.state.username}
                placeholder='username'
                onChange={this.handleChange}
                />
                <label>Enter password here:</label>
                {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Password is required").length > 0 ?  <div className="ErrorB">PASSWORD IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                <input 
                type='password'
                name='password'
                value={this.state.password}
                placeholder='password'
                onChange={this.handleChange}
                />
                <button>Login</button>
                {this.props.loggingIn === true ? <div className='lds-hourglass'>Logging In...</div> : null}
            </form>
            <div className='logFlex'>
                <p>Not yet a user? </p> <Link className='sLink' to='/register'>Signup today</Link> 
            </div>
            <div className='logFlex'>
                <p>Forgot username? </p> <Link className='sLink' to={{pathname: '/forgotusernamepw', state: {forgotUsername: true}}}>Click here</Link> 
            </div>
            <div className='logFlex'>
                <p>Forgot password? </p> <Link className='sLink' to='/forgotusernamepw'>Click here</Link> 
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggingIn: state.loginReducer.loggingIn,
        welcomeMessage: state.loginReducer.welcomeMessage
    }
}

export default connect(mapStateToProps, { login })(Login);