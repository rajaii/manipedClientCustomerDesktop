import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RateService from './RateService.js';
import EditProfile from './EditProfile.js';
import icon from '../../assets/icons8-settings-48.png';
import { fetchUserInfo, fetchCompletedServices, fetchBookings, fetchSettings, fetchAddresses, putSettings, deleteAddress, fetchUserRatings, deleteBooking } from '../../actions/appActions.js';
import './Dashboard.css';
import ErrorComponent from '../ErrorComponent.js';


class FeedSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedCompletedServices: false,
            fetchedUserInfo: false,
            fetchedBookings: false,
            fetchedSettings: false,
            editingProfile: false,
            ratingService: false,
            ratedServiceAlready: false,
            serviceToRateId: null,
            rateErrorId: null
            
    }
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handlePastServicesClick = this.handlePastServicesClick.bind(this);
    this.rateService = this.rateService.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
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
  
   async rateService(e) {
        e.persist()
        e = {...e}
        const user_id = e.target.attributes.user_id.nodeValue;
        const provider_id = e.target.attributes.provider_id.nodeValue
        const user_rating_id = e.target.attributes.user_rating_id != undefined ? e.target.attributes.user_rating_id.nodeValue : null;
        const service_id = e.target.attributes.service_id.nodeValue
        const userId = localStorage.getItem('uID');
        await this.props.fetchUserRatings(userId)        
    
        if (this.props.userRatings.length > 0) {
    
            let rating;
            let pur = this.props.userRatings
            console.log(user_id, provider_id, user_rating_id, service_id, userId)
            for (let i = 0; i < pur.length; i++) {
                if (pur[i].user_id == user_id && pur[i].provider_id == provider_id && pur[i].id == user_rating_id) {
                    rating = pur[i];
                }
                
            }
           console.log(rating)
            if (rating != undefined) {
            this.setState({
                ratedServiceAlready: !this.state.ratedServiceAlready,
                rateErrorId: service_id
            })
            } else {
            this.setState({
                ratingService: !this.state.ratingService,
                serviceToRateId: service_id
            })
        }
        } else {
            this.setState({
                ratingService: !this.state.ratingService,
                serviceToRateId: service_id
            })
}
   }

    async cancelBooking (e) {
        e.persist();
        const services_and_pricing = e.target.attributes.services_and_pricing.nodeValue;
        const provider = e.target.attributes.provider.nodeValue;
        const date = e.target.attributes.date.nodeValue;
        if (window.confirm(`You are about to cancel the appontment on ${date} for ${services_and_pricing} with ${provider}`)) {
            const userId = localStorage.getItem('uID');
            const bookingId = e.target.attributes.booking_id.nodeValue;
            await this.props.deleteBooking(bookingId);
            this.props.fetchBookings(userId);
            } else {
                return
            }
        
    }
   


    render() {
        if (this.props.userInfoError != null) {
            localStorage.clear();
            return <Redirect to='/login' />
        };
        return (

            
            <div className='feedSubWrapper'>
                <div>
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
                                <div className='providerWrap'>
                                <p className='serviceCat'>Provider name: {s.provider_name}</p>
                                <Link className='serviceCat Book' to={{pathname: '/booknow', state: {providerId: s.provider_id, userId: s.user_id, provider_name: s.provider_name, user_name: s.user_name}}}>Book this provider again</Link>
                                </div>
                                <p className='serviceCat'>Completed at: Date: {`${s.created_at.slice(0, 10)}`} Time: {`${s.created_at.slice(11, 16)}`}{`${parseInt(s.created_at.slice(11, 13), 10) < 12 ? 'AM' : '' }`}</p>
                                <p service_id={s.id} user_rating_id={s.user_rating_id}  provider_id={s.provider_id} user_id={s.user_id} onClick={this.rateService} className="serviceRate">Rate this Service</p>
                                {this.state.ratingService && this.state.serviceToRateId == s.id && <RateService closeRateBox={this.closeRateBox} serviceToRateId={this.state.serviceToRateId} service={s} />}
                                {this.state.ratedServiceAlready && this.state.rateErrorId == s.id && <ErrorComponent serviceErrorId={this.state.serviceErrorId} service={s}  error={`You have already rated this service.  Click above again to clear this message...`}/>}
                            </div>
                            
                        )
                    })}
                    
                     

                    {this.state.fetchedUserInfo && this.props.userInfo && (
                    <div className="serviceWrapper">
                        <h1 className="serviceTitle"></h1>
                        <img className='profileImg' src={`${this.props.userInfo.profile_img_url}`} />
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
                                <button booking_id={b.id} provider={b.provider_name} date={b.booking_date.slice(0,10)} services_and_pricing={b.services_and_pricing} className='deleteBookingButton' onClick={this.cancelBooking}>Cancel this booking</button>
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
                                last_name={this.props.userInfo.last_name} profile_img_url={this.props.userInfo.profile_img_url}
                                />
                            )}
                            
                        </div>
                    )}
                    {/* this link messes up the styling of the edit profile forms need to fix */}
                    
                </div>

                <div className='linkWrapper'>
                    <Link to='/cardsetupform' className="checkout-button">Add Payment Method</Link>
                </div>
                
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        completedServices: state.completedServicesReducer.completedServices,
        userInfo: state.userInfoReducer.userInfo,
        userInfoError: state.userInfoReducer.error,
        bookings: state.bookingsReducer.bookings,
        settings: state.settingsReducer.settings,
        addresses: state.addressesReducer.addresses,
        userRatings: state.userRatingsReducer.userRatings,
    }
}

export default connect(mapStateToProps, { fetchUserInfo, fetchCompletedServices, fetchBookings, fetchSettings, fetchAddresses, fetchUserRatings, putSettings, deleteAddress, deleteBooking })(FeedSub);