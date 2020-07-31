import React from 'react';
import { connect } from 'react-redux';

import { postBooking, fetchUsersInfo, fetchProviderInfo, fetchAvailableServices, clearNewBooking } from '../actions/appActions.js';
import './BookNow.css';



class BookNow extends React.Component {
    constructor(props) {
        super(props);
        const { providerId, userId, user_name, provider_name } = this.props.location.state;
        this.state = {
            booking_date: '',
            booking_time: '',
            services_and_pricing: '',
            user_id: userId,
            user_name: user_name,
            provider_id: providerId,
            provider_name: provider_name
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
        if (this.state.booking_date === '' || this.state.booking_time === '' || this.state.services_and_pricing === '') {
            alert('You have to enter all fields to book');
            return
        } else {
        e.preventDefault();
        this.props.postBooking(this.state);
        this.setState({
            booking_date: '',
            booking_time: '',
            services_and_pricing: '',
            user_id: '',
            provider_id: '',
            provider_name: '',
            user_name: ''
        })
        //somehow refresh out so user can book someone else here as is is buggy will keep on same state info
        
    }
    }

    dismiss = e => {
        this.props.clearNewBooking();
        this.props.history.push('/dashboard');

    }

    render() {
        const { provider } = this.props.location.state;

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
                
                <div className={this.props.newBookingDone === true ? 'hide' : null}>

                        <div className='serviceList'>
                        Hey there! Please fill out the following form so we can secure your booking.  Cheers!
                        </div>

                    <div className="form" id='book'>
                            <h1 className='title'>Booking services with {provider}:</h1>
                        
                            <form type='submit' onSubmit={this.handleBooking}>
                            <label className='ml mbmt title'>Booking Date:</label>
                            <input 
                            className='block m0a mbmt'
                            type='date'
                            onChange={this.handleChange}
                            value={this.state.booking_date}
                            name='booking_date'
                            min={today}
                            />
                            <label className='ml mbmt title'>Booking Time:</label>
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
                        
                        <small className='block mbmt'>Booking from 5:00 AM local time to 11:00 PM</small>
                        <label className='block title'>Check The Service/s You Want:</label>
                        <div className="checkboxs">
                            {this.props.availableServices && this.props.availableServices.map(s => {
                                    return (
                                        <div>
                                            <input type="radio" id={`${s.id}`} name="services_and_pricing" value={s.type} checked={(this.state.services_and_pricing === `${s.type}`)} onChange={this.handleChange}/>
                                            <label for={`${s.id}`}>{s.type}</label><br></br>
                                        </div>
                                        
                                    )
                            })}
                        </div>
                    
                        <button className='bookButton' onClick={this.handleBooking}>Book</button>
                        {this.props.postingBooking === true ? <div className='lds-hourglass'>Booking...</div> : null}
                        </form>

                    </div>

                </div>
{/*/////////////////////////////////////////////////////
make an action that makes newbooking done == flase when you leave the page or other logic to render the conditionals in here so users can book more
than once////////////////////////////////////////////////////////////////////////////*/}
               {this.props.newBookingDone === true ? (

                   <div className='successFlex'>


                        <div className='success'>
                            <h1 className='conf'>Confirmation message:</h1>
                            <p className='successP'>Congratulations, you have just completed your booking with {`${this.props.newBooking.booking[0].provider_name}`}.</p>
                            <p className='successP'>Booking date: {`${this.props.newBooking.booking[0].booking_date.slice(0,10)}`}</p>
                            <p className='successP'>Booking time: {`${this.props.newBooking.booking[0].booking_time.slice(0,5)} ${parseInt(this.props.newBooking.booking[0].booking_time.slice(0,2), 10) < 12 ? 'AM' : ''}`}</p>
                            <p className='successP'>Appointment type: {`${this.props.newBooking.booking[0].services_and_pricing}`}</p>
                            <p className='successP'>You will receive a confirmation email once {`${provider}`} has confirmed</p>
                            <button className='bookButton d' onClick={this.dismiss}>Dismiss</button>
                        </div>

                    </div>

                ) : null}

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
        userId: state.loginReducer.welcomeMessage,
        postingBooking: state.bookingsReducer.postingBooking,
        newBookingDone: state.bookingsReducer.newBookingDone,
        newBooking: state.bookingsReducer.newBooking
    }
}


export default connect(mapStateToProps, { fetchUsersInfo, postBooking, fetchProviderInfo, fetchProviderInfo, fetchAvailableServices, clearNewBooking })(BookNow);