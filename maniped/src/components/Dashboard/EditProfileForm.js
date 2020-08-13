import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { editProfile, fetchUserInfo } from '../../actions/appActions.js';
import { render } from '@testing-library/react';

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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const userId = localStorage.getItem('uID');
        if (this.state.address) {
        this.props.editProfile(userId, this.state);
        } else {
            if (this.props.name === 'username') {
                profileEditUsernameSchema.validate(this.state, {abortEarly: false})
                .then(v => {
                    if (v) {
                        this.props.editProfile(userId, this.state);
                        this.setState({
                            [e.target.name]: ''
                        })
                        this.props.history.push('/dashboard')
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
                        this.props.editProfile(userId, this.state);
                        this.setState({
                            [e.target.name]: ''
                        })
                        this.props.history.push('/dashboard')
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
                        this.props.editProfile(userId, this.state);
                        this.setState({
                            [e.target.name]: ''
                        })
                        this.props.history.push('/dashboard')
                    }
                })
                .catch(err => {
                    this.setState({
                        validationError: err
                    })
                })
            } else if (this.props.name === 'zipcode') {
                //=======================================================
                profileEditZipcodeSchema.validate(this.state.zipcode, {abortEarly: false})
                .then(v => {
                    if (v) {
                        this.props.editProfile(userId, this.state);
                        this.setState({
                            [e.target.name]: ''
                        })
                        this.props.history.push('/dashboard')
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
            <form type='submit' onSubmit={this.handleSubmit}>
                <input
                type='text'
                onChange={this.handleChange}
                placeholder={`Edit ${this.props.thing}`}
                value={this.state[this.props.name]}
                name={this.props.name}
                />
                <button className='editProfileButton'>Edit {`${this.props.name}`}</button>
            </form>
            {this.props.name === 'email' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Email is required").length > 0 ?  <div className="Error">EMAIL IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'email' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Please enter a valid email").length > 0 ?  <div className="Error">MUST BE A VALID EMAIL RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'phone_number' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Phone number is required").length > 0 ?  <div className="Error">PHONE NUMBER IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'phone_number' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Please enter a valid phone number").length > 0 ?  <div className="Error">MUST BE A VALID PHONE NUMBER RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'zipcode' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Zipcode is required").length > 0 ?  <div className="Error">ZIPCODE IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'zipcode' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Must be valid zip code").length > 0 ?  <div className="Error">MUST BE A VALID ZIPCODE RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'username' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Username is required").length > 0 ?  <div className="ErrorB">USERNAME IS REQUIRED RE-ENTER AND CLICK SIGN UP</div> : null}
            {this.props.name === 'username' && this.state.validationError && this.state.validationError.inner.filter(i => i.message === "username must be at least 5 characters").length > 0 ?  <div className="Error">USERNAME MUST BE AT LEAST 5 CHARACTERS</div> : null}
        </div>
    )
     }
}



export default connect(null, { editProfile, fetchUserInfo })(EditProfileForm);