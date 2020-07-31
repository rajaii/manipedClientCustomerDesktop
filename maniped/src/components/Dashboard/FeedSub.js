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

    handlePastServicesClick = () => {

    }

    handleProfileClick = () => {

    }

    handleWishListClick = () => {

    }

    handleSettingsClick = () => {

    }



    render() {
        return (
            <div className='serviceList' id="needed">
                <p onClick={this.handleProfileClick} className='each'>Profile</p>
                <p onClick={this.handlePastServicesClick} className='each'>Past Services</p>
                <p onClick={this.handleWishListClick} className='each'>WishList</p>   
                <img onClick={this.handleSettingsClick} className='settings' src={icon}/>
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        availableServices: state.availableServicesReducer.availableServices
    }
}

export default connect(mapStateToProps, { fetchUserInfo, fetchCompletedServices, fetchBookings })(FeedSub);