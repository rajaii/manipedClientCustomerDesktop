import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

import { register } from '../actions/authActions.js';
import './Register.css';


let registrationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required').min(5),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    phone_number: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Please enter a valid phone number').required('Phone number is required'),
    zipcode: yup.string().matches(/^\d{5}([-]|\s*)?(\d{4})?$/, 'Must be valid zip code').required('Zipcode is required'),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must have at least 8 1 upper case letter, at least 1 lower case letter, at least 1 number, and at least 1 special character ').required('Password is required'),
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
        validationError: {inner: []}
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
   
    registrationSchema.validate(this.state, {abortEarly: false})
    .then(async d => {
        if (d) {
        const registered =  await this.props.register(body)
        if (registered.payload.response.data.err.detail === `Key (username)=(${this.state.username}) already exists.`) {
            window.confirm('The username chosen has already been taken.  Please choose another username, and try again...')
            this.setState({
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                phone_number: '',
                zipcode: '',
                password: '',
                verifyPassword: '',
            })
            return
        } else if (registered.payload.response.data.err.detail === `Key (email)=(${this.state.email}) already exists.`) {
            window.confirm('There is already an account associated with that email.  Please choose another email, or click login and click forgot username or password for further instructions...')
            this.setState({
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                phone_number: '',
                zipcode: '',
                password: '',
                verifyPassword: '',
            })
            return
        } else if (registered.payload.response.data.err.detail ===  `Key (phone_number)=(${this.state.phone_number}) already exists.`) {
            window.confirm('There is already an account associated with that phone number.  Please choose another phone number, or click login and click forgot username or password for further instructions...')
            this.setState({
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                phone_number: '',
                zipcode: '',
                password: '',
                verifyPassword: '',
            })
            return
        } else {
        this.setState({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            phone_number: '',
            zipcode: '',
            password: '',
            verifyPassword: '',
        })
        } 
        window.confirm('Thank you for signing up for maniPed for your cosmetic needs!  Please login to your email and verify your account...');
        this.props.history.push('/login');
    }
    })
    .catch(err => {
        this.setState({
            validationError: err
        })
        
    })

}


    render () {

        return(
        <div>
            <form className='formCont' type='submit' onSubmit={this.handleSubmit}>
            <h1 className="welcome">Welcome to maniPed!  Let's get you started with your new user account.</h1>
            {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "First name is required").length > 0 ?  <div className="ErrorB">FIRST NAME IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                <label>Enter first name here:</label>
                <input 
                type='text'
                name='first_name'
                value={this.state.first_name}
                placeholder='first name'
                onChange={this.handleChange}
                />
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Last name is required").length > 0 ?  <div className="ErrorB">LAST NAME IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                <label>Enter last name here:</label>
                <input 
                type='text'
                name='last_name'
                value={this.state.last_name}
                placeholder='last name'
                onChange={this.handleChange}
                />
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Username is required").length > 0 ?  <div className="ErrorB">USERNAME IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "username must be at least 5 characters").length > 0 ?  <div className="Error">USERNAME MUST BE AT LEAST 5 CHARACTERS</div> : null}
                 <label>Enter username here (at least 5 characters):</label>
                <input 
                type='text'
                name='username'
                value={this.state.username}
                placeholder='username'
                onChange={this.handleChange}
                />
                {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Email is required").length > 0 ?  <div className="Error">EMAIL IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Please enter a valid email").length > 0 ?  <div className="Error">MUST BE A VALID EMAIL RE-ENTER AND CLICK SIGN UP</div> : null}
                 <label>Enter email here:</label>
                <input 
                type='text'
                name='email'
                value={this.state.email}
                placeholder='email'
                onChange={this.handleChange}
                />
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Phone number is required").length > 0 ?  <div className="Error">PHONE NUMBER IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Please enter a valid phone number").length > 0 ?  <div className="Error">MUST BE A VALID PHONE NUMBER RE-ENTER AND CLICK SIGN UP</div> : null}
                 <label>Enter phone number here:</label>
                <input 
                type='text'
                name='phone_number'
                value={this.state.phone_number}
                placeholder='phone number'
                onChange={this.handleChange}
                />
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Zipcode is required").length > 0 ?  <div className="Error">ZIPCODE IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Must be valid zip code").length > 0 ?  <div className="Error">MUST BE A VALID ZIPCODE RE-ENTER AND CLICK SIGN UP</div> : null}
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
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Password is required").length > 0 ?  <div className="ErrorB">PASSWORD IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
                 {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Password must have at least 8 1 upper case letter, at least 1 lower case letter, at least 1 number, and at least 1 special character ").length > 0 ?  <div className="Error">REPEAT: USE AT LEAST 1 UPPER CASE, 1 LOWER CASE, 1 NUMBER, 1 SPECIAL CHARACTER RE-ENTER AND CLICK SIGN UP</div> : null}
                <input 
                type='password'
                name='password'
                value={this.state.password}
                placeholder='password'
                onChange={this.handleChange}
                />
                {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Passwords must match").length > 0 ?  <div className="ErrorB">PASSWORDS MUST MATCH, RE-ENTER AND CLICK SIGN UP</div> : null} 
                 <label>Verify password here:</label>
                <input 
                type='password'
                name='verifyPassword'
                value={this.state.verifyPassword}
                placeholder='verify password'
                onChange={this.handleChange}
                />
                
                <button>Sign Up</button>
                {this.props.registering === true ? <div className='lds-hourglass'>Registering...</div> : null}
            
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
        registering: state.regsiterReducer.registering,
        successfulRegister: state.regsiterReducer.successfulRegister
    }
}


export default connect(mapStateToProps, { register })(Register);


