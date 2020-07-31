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

    handlePastServicesClick = (e) => {
        let userId = localStorage.getItem('uID');
        e.preventDefault();
        this.props.fetchCompletedServices(userId);
    }

    handleProfileClick = () => {

    }

    handleWishListClick = () => {

    }

    handleSettingsClick = () => {

    }



    render() {
        return (
            <div className='feedSubWrapper'>

                    <div className='serviceList' id="needed">
                        <p onClick={this.handleProfileClick} className='each'>Profile</p>
                        <p onClick={this.handlePastServicesClick} className='each'>Past Services</p>
                        <p onClick={this.handleWishListClick} className='each'>WishList</p>   
                        <img onClick={this.handleSettingsClick} className='settings' src={icon}/>
                    </div>

                    {this.props.completedServices && this.props.completedServices.map(s => {
                        return (
                            <div>
                                <h1>Type of service: {s.type_of_service}</h1>
                                <p>Amount billed: {s.amount_billed}</p>
                                <p>Provider name: {s.provider_name}</p>
                                <p>Completed at: {s.created_at}</p>
                            </div>
                        )
                    })}

            </div>

        )
        
    }
}

const mapStateToProps = state => {
    return {
        completedServices: state.completedServicesReducer.completedServices,
    }
}

export default connect(mapStateToProps, { fetchUserInfo, fetchCompletedServices, fetchBookings })(FeedSub);