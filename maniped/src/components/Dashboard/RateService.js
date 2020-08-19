import React from 'react';
import { connect } from 'react-redux';

import { putUserRatings } from '../../actions/appActions.js';
import './Dashboard.css';

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