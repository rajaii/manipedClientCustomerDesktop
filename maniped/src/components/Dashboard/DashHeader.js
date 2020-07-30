import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUserInfo } from '../../actions/appActions.js';
import { logout } from '../../actions/authActions.js';
import '../Nav.css';

class DashHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        let userId = localStorage.getItem('uID')
        this.props.fetchUserInfo(userId);
    }

    handleLogout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
        <div className='search' id='sticky'>

            <div>

                <div className='frontFlex'>

                    {/* <img src='./logo.png'/>
                    <p> | </p> */}

                    <p className='p2'>maniPed</p>
                    
                </div>
                
            </div>
                
            <div className='midFlex'>
                <p className='p2'>Welcome {this.props.userInfo && this.props.userInfo.username}</p>
                <Link className='x' to='/providersearch'>Book an appointment now</Link>
            </div>
        
            <div className='newNavFlex'>

                
                <p onClick={this.handleLogout} className='logout'>Logout</p>
                

            </div>

        </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfoReducer.userInfo,
        isLoggedIn: state.loginReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, { fetchUserInfo, logout })(DashHeader);