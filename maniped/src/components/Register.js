import React from 'react';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';

import './Register.css';

//get yup validation object
//set up yup.isvalid function

//set up protected routes
//reg and login (localstorage) actions and reducer (authreducer)
//axioswithauth set headers
// password "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
//phone number
let schema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required').min(5),
    email: yup.string().email().required('Email is required'),
    phone_number: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).required('Phone number is required'),
    zipcode: yup.string().matches(/^\d{5}([-]|\s*)?(\d{4})?$/).required('Zipcode is required'),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required('Password is required'),
    verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

class Signup extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        zipcode: '',
        password: '',
        verifyPassword: '',
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
            <h1 className="welcome">Welcome to maniPed!  Let's get you started with your new user account.</h1>
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
                 <label>Enter username here (at least 5 characters):</label>
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
                 <p>Must have at least 8 1 upper case letter, at least 1 lower case letter, at least 1 number, and at least 1 special character:</p>
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