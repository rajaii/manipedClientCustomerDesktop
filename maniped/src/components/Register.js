import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { connect } from 'react-redux';

import { register } from '../actions/authActions.js';
import './Register.css';


//set up yup.isvalid function
//const valid = await registrationSchema.isValid(this.state);
//handlesubmit, if valid => call action which will do axios and set reducer and post to be 

//set up protected routes
//reg and login (localstorage) actions and reducer (authreducer)
//axioswithauth set headers'
//

let registrationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required').min(5),
    email: yup.string().email().required('Email is required'),
    phone_number: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).required('Phone number is required'),
    zipcode: yup.string().matches(/^\d{5}([-]|\s*)?(\d{4})?$/).required('Zipcode is required'),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required('Password is required'),
    verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });



class Register extends React.Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    }

handleChange = e => {
    this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
    })
   
}
async handleSubmit (e) {
    e.preventDefault();
    const body = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        phone_number: this.state.phone_number,
        zipcode: this.state.zipcode,
        password: this.state.password,
    }
    registrationSchema.isValid(this.state)
    .then(d => {
        console.log(d)
        if (d === true) {
        console.log('true')
        this.props.register(body)
        } else {
            console.log('false')
        }
    })
    .catch(err => console.log(err))
}


    render () {
        let displayValidationError = false;

        return(
        <div>
            
            <form className='formCont' type='submit' onSubmit={this.handleSubmit}>
            
            <h1 className="welcome">Welcome to maniPed!  Let's get you started with your new user account.</h1>
            {/* {displayValidationError === true ? <div>YOU MUST PROPERLY ENTER ALL FIELDS IN ORDER TO REGISTER</div> : null} */}
                <label>Enter first name here:</label>
                <input 
                type='text'
                name='first_name'
                value={this.state.first_name}
                placeholder='first name'
                onChange={this.handleChange}
                />
                <label>Enter last name here:</label>
                <input 
                type='text'
                name='last_name'
                value={this.state.last_name}
                placeholder='last name'
                onChange={this.handleChange}
                />
                 <label>Enter username here (at least 5 characters):</label>
                <input 
                type='text'
                name='username'
                value={this.state.username}
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
                name='phone_number'
                value={this.state.phone_number}
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
                 <p className='p'>Must have at least 8 1 upper case letter, at least 1 lower case letter, at least 1 number, and at least 1 special character:</p>
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
                {/* {this.props.registering && <div className='lds-hourglass'>Registering...</div>} */}
                
                
            </form>
            <div className='finFlex'>
                <p>Already a user?</p>
                <Link className='link' to='/login'>Login</Link>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        registering: state.loginReducer.registering
    }
}

export default connect(mapStateToProps, { register })(Register);

