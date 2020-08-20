import React from 'react';
import { connect } from 'react-redux';

import { putUserRatings } from '../../actions/appActions.js';
import './Dashboard.css';

//Post needs to take these in the body so can both post rating and backend will in that put to the services and add the user_rating_id in services to be the services using the service ID as the one to update in the table
//!rating || !provider_id || !user_id || !service_id

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//911911911 DO NOT FORGET THIS^^^^^




class RateService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={this.props.serviceToRateId != this.props.service.id ? 'hideRateComp' : null}>
                <p>RATE HERE</p>
            </div>
        )
    }
 }

 export default connect(null, { putUserRatings })(RateService);