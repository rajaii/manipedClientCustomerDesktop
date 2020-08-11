import React from 'react';
import { connect } from 'react-redux';

import icon from '../../assets/icons8-settings-48.png';
import { fetchUserInfo, fetchCompletedServices, fetchBookings, fetchSettings, fetchAddresses, putSettings } from '../../actions/appActions.js';
import './Dashboard.css';


class FeedSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedCompletedServices: false,
            fetchedUserInfo: false,
            fetchedBookings: false,
            fetchedSettings: false,
            editingProfile: false,
            sms: '',
            privacy: ''
    }
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleSettingsToggleClick = this.handleSettingsToggleClick.bind(this);
    }


    //to render these individaully will need to set reducer state for each one ie pastservicesShowingDAsh ==true then set to false on others
    //when calling the other to render so conditionals show only one at a time
   
    handlePastServicesClick = () => {
        this.setState({
            fetchedUserInfo: false,
            fetchedBookings: false,
            fetchedSettings: false,
            editingProfile: false,
            fetchedCompletedServices: true,
        })
        let userId = localStorage.getItem('uID');
        this.props.fetchCompletedServices(userId);
    }

    handleProfileClick = () => {
        this.setState({
            fetchedUserInfo: true,
            fetchedBookings: false,
            fetchedSettings: false,
            editingProfile: false,
            fetchedCompletedServices: false,
        })
        const userId = localStorage.getItem('uID');
        this.props.fetchUserInfo(userId);
    }

    handleWishListClick = () => {
        this.setState({
            fetchedUserInfo: false,
            fetchedBookings: true,
            fetchedCompletedServices: false,
            editingProfile: false, 
            fetchedSettings: false,
        })
        const userId = localStorage.getItem('uID');
        this.props.fetchBookings(userId);
    }

    async handleSettingsClick () {
        this.setState({
            fetchedUserInfo: false,
            fetchedBookings: false,
            fetchedCompletedServices: false,
            editingProfile: false,
            fetchedSettings: true
        })
        const userId = localStorage.getItem('uID');
        this.props.fetchUserInfo(userId);
        let settings = await this.props.fetchSettings(userId);
        if (settings) {
        this.setState({
            sms: this.props.settings[0].sms,
            privacy: this.props.settings[0].privacy
        })
    }
        this.props.fetchAddresses(userId);
        //this.props.fetchAddresses(userId);
    }

    handleEdit = () => {
        const userId = localStorage.getItem('uID');
        this.props.fetchUserInfo(userId)
        this.setState({
            editingProfile: true
        })
        
        
    }

    closeEdit = () => {
        this.setState({
            editingProfile: false
        })
    }

  

  handleSettingsToggleClick (e) {
        const userId = localStorage.getItem('uID');
        let body = {}
        console.log('3 NIGGA', JSON.stringify(this.props.settings))
        if (this.props.settings[0][e.target.name] === false) {
            body[e.target.name] = true
        } else if (this.props.settings[0][e.target.name] === true) {
            body[e.target.name] = false
        }
       
        this.props.putSettings(userId, body);
        
        console.log(JSON.stringify(this.props.settings))
        this.props.fetchSettings(userId);
        console.log('2 NIGGA', JSON.stringify(this.props.settings))
        this.setState({
            ...this.state,
            [e.target.name]: this.props.settings[e.target.value]
        })
        
        
       
        
    }
   //setState still not running




    render() {
        return (
            <div className='feedSubWrapper'>
                {/* fix this to be sticky and then add another div udner and style to scroll indepedantly */}
                    <div className='serviceList' id="needed">
                        <p onClick={this.handleProfileClick} className='each'>Profile</p>
                        <p onClick={this.handlePastServicesClick} className='each'>Past Services</p>
                        <p onClick={this.handleWishListClick} className='each'>WishList</p>   
                        <img onClick={this.handleSettingsClick} className='settings' src={icon}/>
                    </div>

                    {this.state.fetchedCompletedServices && this.props.completedServices && this.props.completedServices.map(s => {
                        return (
                            <div className='serviceWrapper'>
                                <h1 className='serviceTitle'>Type of service: {s.type_of_service}</h1>
                                <p className='serviceCat'>Amount billed: {s.amount_billed}</p>
                                <p className='serviceCat'>Provider name: {s.provider_name}</p>
                                <p className='serviceCat'>Completed at: Date: {`${s.created_at.slice(0, 10)}`} Time: {`${s.created_at.slice(11, 16)}`}{`${parseInt(s.created_at.slice(11, 13), 10) < 12 ? 'AM' : '' }`}</p>
                                <p className="serviceRate">Rate this Service</p>
                            </div>
                        )
                    })}

                    {this.state.fetchedUserInfo && this.props.userInfo && (
                        
                            <div className='serviceWrapper'>
                                <h1 className='serviceTitle'>Name: {this.props.userInfo.first_name} {this.props.userInfo.last_name}</h1>
                                <p className='serviceCat'>Username: {this.props.userInfo.username}</p>
                                <p className='serviceCat'>Email: {this.props.userInfo.email}</p>
                                <p className='serviceCat'>Phone number: {this.props.userInfo.phone_number}</p>
                                <p className='serviceCat'>Zipcode: {this.props.userInfo.zipcode}</p>
                            </div>
                        )
                    }

                    {this.state.fetchedBookings && this.props.bookings && this.props.bookings.map(b => {
                        if (b.confirmed === false) {
                        return (
                            <div className='serviceWrapper'>
                                <h1 className='serviceTitle'>Booking date: {b.booking_date.slice(0,10)}</h1>
                                <p className='serviceCat'>Booking time: {`${b.booking_time.slice(0,5)} ${parseInt(b.booking_time.slice(0,2), 10) < 12 ? 'AM' : ''}`}</p>
                                <p className='serviceCat'>Services and pricing: {b.services_and_pricing}</p>
                                <p className='serviceCat'>Provider name: {b.provider_name}</p>
                            </div>
                        )
                        }
                    })} 

                    {this.state.fetchedSettings && this.props.settings && this.props.addresses && (
                        <div className="settingsWrap">   
                            <h1 className="settingsTit">Settings</h1>
                            <div className="checkWrappper">
                                <p className="settingsP">Privacy:</p><p className="settingsdes">click to block geolocation services when not in the service time window</p> 
                                <label className="switch">
                                    <input type="checkbox" checked={this.state.privacy} name='privacy' value={this.state.privacy} onChange={this.handleSettingsToggleClick}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="checkWrappper">
                                <p className="settingsP">SMS:</p><p className="settingsdes">click to block SMS notifications</p>
                                <label className="switch">
                                    <input type="checkbox" checked={this.state.sms} name="sms" value={this.state.sms}  onChange={this.handleSettingsToggleClick}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <p className="settingsP">Service address/es:</p>
                            {this.props.addresses ? this.props.addresses.length > 1 && this.props.addresses.map((a, i) => {
                                return <p>Address {i + 1}: {a.address}</p>
                            }) || <p className="addressP">{this.props.addresses.address}</p> : <p className="addressP">There are no addresses at this time</p>}
                            <p className="settingsP" onClick={this.state.editingProfile === false ? this.handleEdit : this.closeEdit}>Edit Profile:</p>
                            {this.state.editingProfile && (
                                <div className="editProfileWrapper">
                                    <p className="editProfile">Name: {this.props.userInfo.first_name} {this.props.userInfo.last_name}</p>
                                    <p className="editProfile">User name: {this.props.userInfo.username}: click to edit/change</p>
                                    <p className="editProfile">Phone number: {this.props.userInfo.phone_number}: click to edit/change</p>
                                    <p className="editProfile">Zipcode: {this.props.userInfo.zipcode}: click to edit/change</p>
                                    <p className="editProfile">Primary address: {this.props.userInfo.address ? `${this.props.userInfo.address}` : 'Not entered: click here to enter primary address'}: click to edit/change</p>
                                </div>
                            )}
                        </div>
                    )}

            </div>

        )
        
    }
}

const mapStateToProps = state => {
    return {
        completedServices: state.completedServicesReducer.completedServices,
        userInfo: state.userInfoReducer.userInfo,
        bookings: state.bookingsReducer.bookings,
        settings: state.settingsReducer.settings,
        addresses: state.addressesReducer.addresses
    }
}

export default connect(mapStateToProps, { fetchUserInfo, fetchCompletedServices, fetchBookings, fetchSettings, fetchAddresses, putSettings })(FeedSub);