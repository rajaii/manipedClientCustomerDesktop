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
                {this.props.availableServices && this.props.availableServices.map(s => {
                  return  <p className='service'>{s.type}</p>
                })}
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        availableServices: state.fetchAvailableServicesReducer.availableServices
    }
}

export default connect(mapStateToProps, { fetchAvailableServices })(DashSubHeader);