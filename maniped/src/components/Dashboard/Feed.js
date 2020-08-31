import React from 'react';
import { connect } from 'react-redux';

import FeedSub from './FeedSub.js';
import { fetchBookings, deleteBooking } from '../../actions/appActions.js';
import './Dashboard.css';


class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.cancelBooking = this.cancelBooking.bind(this);
    }
    componentDidMount() {
        this.props.fetchBookings(localStorage.getItem('uID'))
    }

     async cancelBooking (e) {
        e.persist();
        const userId = localStorage.getItem('uID');
        const bookingId = e.target.attributes.booking_id.nodeValue;
        await this.props.deleteBooking(bookingId);
        this.props.fetchBookings(userId);
        
    }

    render() {
        return (
            <div className='feedWrap'>
                <div className='feed'>
                {/* fix this in place add div and style to be sitcky add another div under and style to scroll indepedantly from left */}
                   
                        <h1 className='feedtitle'>Your Upcoming Confirmed Services:</h1>

                    {this.props.bookings && this.props.bookings.map(b => {
                    if (b.confirmed === true) {
                    return (
                        <div className="mappeddiv">
                            <h1>Service with {b.provider_name}</h1>
                            <p className='service'>Service type: {b.services_and_pricing}</p>
                            <p className='service'>Service date:{b.booking_date.slice(0,10)}</p>
                            <p className='service'>Service time:{b.booking_time.slice(0,5)}{parseInt(b.booking_time.slice(0,2), 10) < 12 ? 'AM' : ''}</p>
                            <p className='service'>{b.confirmed === true ? 'Service has been confirmed by the provider' : 'Service has not yet been confirmed by the provider'}</p>
                            <button booking_id={b.id} className='deleteBookingButton' onClick={this.cancelBooking}>Cancel this booking</button>
                        </div>
                    )
                    } else {
                        return null
                    }
                    })} 
                
                    
                </div>
                <FeedSub/>
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        bookings: state.bookingsReducer.bookings
    }
}

export default connect(mapStateToProps, { fetchBookings, deleteBooking })(Feed);