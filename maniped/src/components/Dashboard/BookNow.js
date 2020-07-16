import React from 'react';
import { connect } from 'react-redux';

import { postBooking } from '../../actions/appActions.js';
import './Dashboard.css';


class BookNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.fetchUserInfo()
    }

    render() {
        return (
            <div className='serviceList'>
                {/* {this.props.userInfo && this.props.userInfo.map(s => {
                  return  <p className='service'>{s.type}</p>
                })} */}
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfoReducer.userInfo
    }
}

export default connect(null, { fetchUserInfo })(Feed);