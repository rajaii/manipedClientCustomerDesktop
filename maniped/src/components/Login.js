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
            password: ''
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
        e.preventDefault();
        loginSchema.isValid(this.state)
        .then(d => {
            console.log(d)
            if (d === true) {
            console.log('true')
            this.props.login(this.state)
            this.setState({
                username: '',
                password: ''
            })
            } else {
                console.log('false')
            }
        })
        .catch(err => console.log(err))
    }

    render () {
        return (
        <div className='loginCont'>
            <form className='loginCont' type='submit' onSubmit={this.handleSubmit}>
                <h1 className="existing">Existing Users Sign In Here:</h1>
                <label>Enter username here:</label>
                <input 
                type='text'
                name='username'
                value={this.state.username}
                placeholder='username'
                onChange={this.handleChange}
                />
                <label>Enter password here:</label>
                <input 
                type='password'
                name='password'
                value={this.state.password}
                placeholder='password'
                onChange={this.handleChange}
                />
                <button>Login</button>
            </form>
            <div className='logFlex'>
                <p>Not yet a user? </p> <Link className='sLink' to='/register'>Signup today</Link> 
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