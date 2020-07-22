import React from 'react';
import { connect } from 'react-redux';

import { postBooking, fetchUsersInfo, fetchProviderInfo, fetchAvailableServices } from '../actions/appActions.js';
import './BookNow.css'


class BookNow extends React.Component {
    constructor(props) {
        super(props);
        const { providerId, userId } = this.props.location.state;
        this.state = {
            booking_date: null,
            booking_time: null,
            service: null,
            user_id: userId,
            provider_id: providerId
        }
    }
    componentDidMount() {
        this.props.fetchAvailableServices();
    }
    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleBooking = e => {

    }

    render() {
        

        let today = new Date(),
        day = today.getDate(),
        month = today.getMonth()+1, //January is 0
        year = today.getFullYear();
            if(day<10){
                    day='0'+day
                } 
            if(month<10){
                month='0'+month
            }
            today = year+'-'+month+'-'+day;
        return (

        <div>

                <div className='serviceList'>
                Hello {this.props.userInfo && `${this.props.userInfo[0].first_name}`} {this.props.userInfo && `${this.props.userInfo[0].last_name}`}.  Please fill out the following form so we can secure your booking.  Cheers!
                </div>

            <div className="form">
                
                    <form type='submit' onSubmit={this.handleBooking}>
                    <label className='ml mbmt'>Booking Date:</label>
                    <input 
                    className='block m0a mbmt'
                    type='date'
                    onChange={this.handleChange}
                    value={this.state.booking_date}
                    name='booking_date'
                    min={today}
                    />
                    <label className='ml mbmt'>Booking Time:</label>
                    <input
                    className='block m0a mbmt'
                    type='time'
                    onChange={this.handleChange}
                    value={this.state.booking_time}
                    name='booking_time'
                    min='05:00'
                    max='23:00'
                    required
                    />
                
                <small className='block mbmt'>Booking hours are from 5:00 AM local time to 11:00 PM</small>
                <label className='block'>Check The Service/s You Want:</label>
                <div className="checkboxs">
                    {this.props.availableServices && this.props.availableServices.map(s => {
                            return (
                                <div>
                                    <input type="radio" id={`${s.id}`} name="service" value={s.type} onChange={this.handleChange}/>
                                    <label for={`${s.id}`}>{s.type}</label><br></br>
                                </div>
                                
                            )
                    })}
                </div>
               

                
                </form>

            </div>

        </div>
                        )
                        
                    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfoReducer.userInfo,
        providersInfo: state.providerReducer.providers,
        providerInfo: state.providerReducer.provider,
        availableServices: state.availableServicesReducer.availableServices,
        userId: state.loginReducer.welcomeMessage
    }
}


export default connect(mapStateToProps, { fetchUsersInfo, postBooking, fetchProviderInfo, fetchProviderInfo, fetchAvailableServices })(BookNow);