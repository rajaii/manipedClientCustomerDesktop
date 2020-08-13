import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { editProfile, fetchUserInfo } from '../../actions/appActions.js';
import { render } from '@testing-library/react';

let profileEditSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(5),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    phone_number: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Please enter a valid phone number').required('Phone number is required'),
    zipcode: yup.string().matches(/^\d{5}([-]|\s*)?(\d{4})?$/, 'Must be valid zip code').required('Zipcode is required'),
  });

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

     handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = (e) => {
        //validate the info with yup
        const userId = localStorage.getItem('uID');
        e.preventDefault();
        this.props.editProfile(userId, this.state);

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
        </div>
    )
     }
}



export default connect(null, { editProfile, fetchUserInfo })(EditProfileForm);