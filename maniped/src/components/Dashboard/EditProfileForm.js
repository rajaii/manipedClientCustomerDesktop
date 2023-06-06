import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { editProfile, fetchUserInfo } from '../../actions/appActions.js';


let profileEditUsernameSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(5),
  });
let profileEditEmailSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
})
let profileEditZipcodeSchema = yup.object().shape({
    zipcode: yup.string().matches(/^\d{5}([-]|\s*)?(\d{4})?$/, 'Must be valid zip code').required('Zipcode is required'),
})
let profileEditPhoneNumberSchema = yup.object().shape({
    phone_number: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Please enter a valid phone number').required('Phone number is required'),
})

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validationError: {errors: [], inner: []}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }
//add logic if error comes back to tell user email already exists
    async handleSubmit(e) {
        e.preventDefault();
        const userId = localStorage.getItem('uID');
        if (this.state.address) {
        const body = {"address": this.state[this.props.name]}
        this.props.editProfile(userId, body);
        this.props.closeEdit();
        } else {
            if (this.props.name === 'username') {
                profileEditUsernameSchema.validate(this.state, {abortEarly: false})
                .then(v => {
                    if (v) {
                        const body = {'username': this.state[this.props.name]}
                        this.props.editProfile(userId, body);
                        this.setState({
                            [this.props.name]: ''
                        })
                        this.props.closeEdit();
                    }
                })
                .catch(err => {
                    this.setState({
                        
                        validationError: err
                    })
                })
            } else if (this.props.name === 'email') {
                profileEditEmailSchema.validate(this.state, {abortEarly: false})
                .then(v => {
                    if (v) {
                        const body = {'email': this.state[this.props.name]}
                        this.props.editProfile(userId, body);
                        this.setState({
                            [this.props.name]: ''
                        })
                        this.props.closeEdit();
                    }
                })
                .catch(err => {
                    this.setState({
                        validationError: err
                    })
                })
            } else if (this.props.name === 'phone_number') {
                profileEditPhoneNumberSchema.validate(this.state, {abortEarly: false})
                .then(v => {
                    if (v) {
                        const body = {'phone_number': this.state[this.props.name]}
                        this.props.editProfile(userId, body);
                        this.setState({
                            [this.props.name]: ''
                        })
                        this.props.closeEdit();
                    }
                })
                .catch(err => {
                    this.setState({
                        validationError: err
                    })
                })
            } else if (this.props.name === 'zipcode') {
                profileEditZipcodeSchema.validate(this.state, {abortEarly: false})
                .then(v => {
                    if (v) {
                        const body = {'zipcode': this.state[this.props.name]}
                        this.props.editProfile(userId, body);
                        this.setState({
                            [this.props.name]: ''
                        })
                        this.props.closeEdit();
                    }
                })
                .catch(err => {
                    this.setState({
                        validationError: err
                    })
                })
            }
                
        }
        

    }
     
    render() {

     return (
        <div>
            <form className='formWrap' type='submit' onSubmit={this.handleSubmit}>
                <input
                className="editProfileInput"
                type='text'
                onChange={this.handleChange}
                placeholder={`Edit ${this.props.thing}`}
                value={this.state[this.props.name]}
                name={this.props.name}
                />
                <button className='editProfileButton'>Edit {`${this.props.thing}`}</button>
            </form>
            {this.props.name === 'email' && this.state.validationError && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Email is required") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Email is required").length > 0) ?  <div className="Error">EMAIL IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'email' && this.state.validationError && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Please enter a valid email") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Please enter a valid email").length > 0)  ?  <div className="Error">MUST BE A VALID EMAIL RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'phone_number' && this.state.validationError  && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Phone number is required") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Phone number is required").length > 0)  ?  <div className="Error">PHONE NUMBER IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'phone_number' && this.state.validationError && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Please enter a valid phone number") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Please enter a valid phone number").length > 0) ?  <div className="Error">MUST BE A VALID PHONE NUMBER RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'zipcode' && this.state.validationError && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Zipcode is required") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Zipcode is required").length > 0) ?  <div className="Error">ZIPCODE IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'zipcode' && this.state.validationError && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Please enter a valid zipcode") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Please enter a valid zipcode").length > 0) ?  <div className="Error">MUST BE A VALID ZIPCODE RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'username' && this.state.validationError && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Username is required") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Username is required").length > 0) ?  <div className="ErrorB">USERNAME IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'username' && this.state.validationError && (this.state.validationError.errors && this.state.validationError.errors[0] && this.state.validationError.errors[0] === "Please enter a valid username") || (this.state.validationError.inner && this.state.validationError.inner.filter(i => i.message === "Please enter a valid username").length > 0) ?  <div className="Error">USERNAME MUST BE AT LEAST 5 CHARACTERS</div> : null}
        </div>
    )
     }
}



export default connect(null, { editProfile, fetchUserInfo })(EditProfileForm);