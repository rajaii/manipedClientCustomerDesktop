import React from 'react';

import EditProfileForm from './EditProfileForm.js';
import './Dashboard.css';


class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingUsername: false,
            editingEmail: false,
            editingPhoneNumber: false,
            editingPrimaryAddress: false,
            editingZip: false,
        }
    }
     

    openForm = (e) => {
        const currentState = this.state[e.target.getAttribute('name')]
        this.setState({
            [e.target.getAttribute('name')]: !currentState
        })
    }
    render() {
    return (
    <div className='editProfileWrapper'>
        <p onClick={this.openForm} name='editingUsername' value={this.state.editingUsername} className='editProfile'>Username: {this.props.username}</p>
        {this.state.editingUsername && <EditProfileForm closeEdit={this.props.closeEdit} thing='username' name='username'/>}
        <p onClick={this.openForm} name='editingEmail' value={this.state.editingEmail} className='editProfile'>Email: {this.props.email}</p>
        {this.state.editingEmail && <EditProfileForm closeEdit={this.props.closeEdit} thing='email' name='email'/>}
        <p onClick={this.openForm} name='editingPhoneNumber' value={this.state.editingPhoneNumber} className='editProfile'>Phone number: {this.props.phone_number}</p>
        {this.state.editingPhoneNumber && <EditProfileForm  closeEdit={this.props.closeEdit}thing='phone number' name='phone_number'/>}
        <p onClick={this.openForm} name='editingPrimaryAddress' value={this.state.editingPrimaryAddress} className='editProfile'>Primary address: {this.props.address}</p>
        {this.state.editingPrimaryAddress && <EditProfileForm closeEdit={this.props.closeEdit} thing='primary address' name='address'/>}
        <p onClick={this.openForm} name='editingZip' value={this.state.editingZip} className='editProfile'>Primary zipcode: {this.props.zipcode}</p>
        {this.state.editingZip && <EditProfileForm closeEdit={this.props.closeEdit} thing='zipcode' name='zipcode'/>}
    </div>
    )
    }
}

export default EditProfile;