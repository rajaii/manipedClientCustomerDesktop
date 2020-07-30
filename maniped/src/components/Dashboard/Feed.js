import React from 'react';
import { connect } from 'react-redux';

import FeedSub from './FeedSub.js';
import { fetchBookings } from '../../actions/appActions.js';
import './Dashboard.css';


class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.fetchBookings(localStorage.getItem('uID'))
    }

    render() {
        return (
            <div className='feedWrap'>
                <div className='feed'>
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
                        </div>
                    )
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

export default connect(mapStateToProps, { fetchBookings })(Feed);