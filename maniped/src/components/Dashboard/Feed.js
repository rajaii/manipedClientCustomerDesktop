import React from 'react';
import { connect } from 'react-redux';

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
            <div className='feed'>
                Your Upcoming Services:
                {/* {this.props.bookings && this.props.bookings.map(b => {
                  return (
                      <p className='service'>{b.se}</p>
                      <p className='service'></p>
                  )
                })}  */}
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