import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

class Signup extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        zipcode: '',
        password: '',
        verifyPassword: '',
        sEWorker: false,
        sEConsumer: false
    }
    }

handleChange = e => {
    this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
    })
   
}

handleRadioChange = e => {
    this.setState({
        ...this.state,
        [e.target.name]: true
    })
}

    render () {
        return(
        <div>
            <form className='formCont' type='submit'>
                <label>Enter first name here:</label>
                <input 
                type='text'
                name='firstName'
                value={this.state.firstName}
                placeholder='first name'
                onChange={this.handleChange}
                />
                <label>Enter last name here:</label>
                <input 
                type='text'
                name='lastName'
                value={this.state.lastName}
                placeholder='last name'
                onChange={this.handleChange}
                />
                 <label>Enter username here:</label>
                <input 
                type='text'
                name='userName'
                value={this.state.userName}
                placeholder='username'
                onChange={this.handleChange}
                />
                 <label>Enter email here:</label>
                <input 
                type='text'
                name='email'
                value={this.state.email}
                placeholder='email'
                onChange={this.handleChange}
                />
                 <label>Enter phone number here:</label>
                <input 
                type='text'
                name='phoneNumber'
                value={this.state.phoneNumber}
                placeholder='phone number'
                onChange={this.handleChange}
                />
                <label>Enter zipcode here:</label>
                <input 
                type='text'
                name='zipcode'
                value={this.state.zipcode}
                placeholder='zipcode'
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
                 <label>Verify password here:</label>
                <input 
                type='password'
                name='verifyPassword'
                value={this.state.verifyPassword}
                placeholder='verify password'
                onChange={this.handleChange}
                />
                
                <button>Sign Up</button>

            </form>
            <div className='finFlex'>
                <p>Already a user?</p>
                <Link className='link' to='/login'>Login</Link>
            </div>
        </div>
        )
    }
}

export default Signup;