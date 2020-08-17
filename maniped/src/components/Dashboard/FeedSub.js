import React from 'react';
import { connect } from 'react-redux';

import RateService from './RateService.js';
import EditProfile from './EditProfile.js';
import icon from '../../assets/icons8-settings-48.png';
import { fetchUserInfo, fetchCompletedServices, fetchBookings, fetchSettings, fetchAddresses, putSettings, deleteAddress } from '../../actions/appActions.js';
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
            ratingService: false
            
    }
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handlePastServicesClick = this.handlePastServicesClick.bind(this);
    }

    

    //to render these individaully will need to set reducer state for each one ie pastservicesShowingDAsh ==true then set to false on others
    //when calling the other to render so conditionals show only one at a time
   
    handlePastServicesClick () {
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

  

  handleSettingsToggleClick = e => {
        const userId = localStorage.getItem('uID');
        let body = {}
        
        if (this.props.settings[0][e.target.name] === false) {
            body[e.target.name] = true
        } else if (this.props.settings[0][e.target.name] === true) {
            body[e.target.name] = false
        }
       
        this.props.putSettings(userId, body);

        this.props.fetchSettings(userId);
            
    }

    handleDeleteAddressClick = e => {
        const userId = localStorage.getItem('uID');
        console.log(e.target.value)
        this.props.deleteAddress(e.target.value);
        this.props.fetchAddresses(userId);
    }

    rateService = e => {
        this.setState({
            ratingService: !this.state.ratingService
        })
    }


     //=============> yup validation in form again (see registerschema)
    //add logic in if error on put to alert the error to the user and have them retry
   //test to make sure runs
    // further style according to how it looks



    render() {
        return (
            <div className='feedSubWrapper'>
                {/* fix this to be sticky and then add another div udner and style to scroll indepedantly */}
                    <div className='serviceList' id="needed">
                        <p onClick={this.handleProfileClick} className='each'>Profile</p>
                        <p onClick={this.handlePastServicesClick} className='each'>Past Services</p>
                        <p onClick={this.handleWishListClick} className='each'>WishList</p>   
                        <img alt='settings icon' onClick={this.handleSettingsClick} className='settings' src={icon}/>
                    </div>

                    {this.state.fetchedCompletedServices && this.props.completedServices && this.props.completedServices.map(s => {
                        return (
                            <div className='serviceWrapper'>
                                <h1 className='serviceTitle'>Type of service: {s.type_of_service}</h1>
                                <p className='serviceCat'>Amount billed: {s.amount_billed}</p>
                                <p className='serviceCat'>Provider name: {s.provider_name}</p>
                                <p className='serviceCat'>Completed at: Date: {`${s.created_at.slice(0, 10)}`} Time: {`${s.created_at.slice(11, 16)}`}{`${parseInt(s.created_at.slice(11, 13), 10) < 12 ? 'AM' : '' }`}</p>
                                <p onClick={this.rateService} className="serviceRate">Rate this Service</p>
                                
                            </div>
                        )
                    })}
                    {this.state.ratingService && <RateService />}
                    {this.state.fetchedUserInfo && this.props.userInfo && (
                    <div className="serviceWrapper">
                        <h1 className="serviceTitle"></h1>
                        <p className="serviceCat">Name: {this.props.userInfo.first_name} {this.props.userInfo.last_name}</p>
                        <p className="serviceCat">User name: {this.props.userInfo.username}</p>
                        <p className="serviceCat">Phone number: {this.props.userInfo.phone_number}</p>
                        <p className="serviceCat">Zipcode: {this.props.userInfo.zipcode}</p>
                        <p className="serviceCat">Primary address: {this.props.userInfo.address ? this.props.userInfo.address : 'No primary address entered; go to settings and edit profile to add one.'}</p>
                    </div>
                    )}

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
                        } else {
                            return null;
                        } 
                    })} 

                    {this.state.fetchedSettings && this.props.settings && this.props.addresses && (
                        <div className="settingsWrap">   
                            <h1 className="settingsTit">Settings</h1>
                            <div className="checkedWrapper">
                                <div>
                                    <p className="settingsP">Privacy:</p><p className="settingsdes">click to block geolocation services when not in the service time window</p> 
                                </div>
                                <label className="switch">
                                    <input type="checkbox" checked={this.props.settings[0].privacy} name='privacy' value={this.state.privacy} onChange={this.handleSettingsToggleClick}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="checkedWrapper">
                                <div>
                                    <p className="settingsP">SMS:</p><p className="settingsdes">click to block SMS notifications</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" checked={this.props.settings[0].sms} name="sms" value={this.state.sms}  onChange={this.handleSettingsToggleClick}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <p className="settingsP">Service address/es:</p>
                            {this.props.addresses.length > 0 ? this.props.addresses.map((a, i) => {
                                return (
                                    <div className='addressWrapper'>
                                        <p>Address {i + 1}: {a.address}</p>
                                        <button onClick={this.handleDeleteAddressClick} value={a.id} className='deleteAddressButton'>Delete Address</button>
                                    </div>
                                )
                            }) : <p className="addressP">There are no addresses at this time</p>}
                            <p className="E" onClick={this.state.editingProfile === false ? this.handleEdit : this.closeEdit}>Edit Profile:</p>
                            {this.state.editingProfile && (
                                <EditProfile closeEdit={this.closeEdit} username={this.props.userInfo.username} email={this.props.userInfo.email}
                                phone_number={this.props.userInfo.phone_number} address={this.props.userInfo.address} zipcode={this.props.userInfo.zipcode} first_name={this.props.userInfo.first_name}
                                last_name={this.props.userInfo.last_name}
                                />
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

export default connect(mapStateToProps, { fetchUserInfo, fetchCompletedServices, fetchBookings, fetchSettings, fetchAddresses, putSettings, deleteAddress })(FeedSub);