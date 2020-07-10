import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import './Login.css';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render () {
        return (
        <div className='loginCont'>
            <form className='loginCont' type='submit'>
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

export default Login;