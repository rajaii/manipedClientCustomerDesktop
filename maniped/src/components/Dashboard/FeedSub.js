import React from 'react';
import { connect } from 'react-redux';

import icon from '../../assets/icons8-settings-48.png';
import { fetchUserInfo, fetchCompletedServices, fetchBookings } from '../../actions/appActions.js';
import './Dashboard.css';


class FeedSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    //to render these individaully will need to set reducer state for each one ie pastservicesShowingDAsh ==true then set to false on others
    //when calling the other to render so conditionals show only one at a time
    handlePastServicesClick = () => {
        let userId = localStorage.getItem('uID');
        this.props.fetchCompletedServices(userId);
    }

    handleProfileClick = () => {
        const userId = localStorage.getItem('uID');
        this.props.fetchUserInfo(userId);
    }

    handleWishListClick = () => {
        const userId = localStorage.getItem('uID');
        this.props.fetchBookings(userId);
    }

    handleSettingsClick = () => {

    }



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

                    {this.props.completedServices && this.props.completedServices.map(s => {
                        return (
                            <div className='serviceWrapper'>
                                <h1 className='serviceTitle'>Type of service: {s.type_of_service}</h1>
                                <p className='serviceCat'>Amount billed: {s.amount_billed}</p>
                                <p className='serviceCat'>Provider name: {s.provider_name}</p>
                                <p className='serviceCat'>Completed at: {s.created_at}</p>
                            </div>
                        )
                    })}

                    {this.props.userInfo && (
                        
                            <div className='serviceWrapper'>
                                <h1 className='serviceTitle'>Name: {this.props.userInfo.first_name} {this.props.userInfo.last_name}</h1>
                                <p className='serviceCat'>Username: {this.props.userInfo.username}</p>
                                <p className='serviceCat'>Email: {this.props.userInfo.email}</p>
                                <p className='serviceCat'>Phone number: {this.props.userInfo.phone_number}</p>
                                <p className='serviceCat'>Zipcode: {this.props.userInfo.zipcode}</p>
                            </div>
                        )
                    }

                    {this.props.bookings && this.props.bookings.map(b => {
                        if (b.confirmed === false) {
                        return (
                            <div className='serviceWrapper'>
                                <h1 className='serviceTitle'>Booking date: {b.booking_date}</h1>
                                <p className='serviceCat'>Booking time: {b.booking_time}</p>
                                <p className='serviceCat'>Services and pricing: {b.services_and_pricing}</p>
                                <p className='serviceCat'>Provider name: {b.provider_name}</p>
                            </div>
                        )
                        }
                    })} 

            </div>

        )
        
    }
}

const mapStateToProps = state => {
    return {
        completedServices: state.completedServicesReducer.completedServices,
        userInfo: state.userInfoReducer.userInfo,
        bookings: state.bookingsReducer.bookings
    }
}

export default connect(mapStateToProps, { fetchUserInfo, fetchCompletedServices, fetchBookings })(FeedSub);