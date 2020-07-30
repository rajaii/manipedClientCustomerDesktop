import React from 'react';
import { connect } from 'react-redux';

import icon from '../../assets/icons8-settings-48.png';
import { fetchAvailableServices } from '../../actions/appActions.js';
import './Dashboard.css';


class FeedSub extends React.Component {
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
            <div className='serviceList' id="needed">
                <p className='each'>Profile</p>
                <p className='each'>Past Services</p>
                <p className='each'>WishList</p>   
                <img className='settings' src={icon}/>
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        availableServices: state.availableServicesReducer.availableServices
    }
}

export default connect(mapStateToProps, { fetchAvailableServices })(FeedSub);