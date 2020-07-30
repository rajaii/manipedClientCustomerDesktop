import React from 'react';
import { connect } from 'react-redux';

import { fetchAvailableServices } from '../../actions/appActions.js';
import './Dashboard.css';


class DashSubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.fetchAvailableServices()
    }

    render() {
        return (
            <div className='serviceList'>
                <p>Profile</p>
                <p>Future bookings</p>
                <p>Tentative bookings</p>   
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        availableServices: state.availableServicesReducer.availableServices
    }
}

export default connect(mapStateToProps, { fetchAvailableServices })(DashSubHeader);