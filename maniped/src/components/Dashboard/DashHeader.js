import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUserInfo } from '../../actions/appActions.js';
import '../Nav.css';

class DashHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.fetchUserInfo();
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
                <p className='p2'>Welcome {this.props.userInfo && this.props.userInfo[0].username}</p>
                <Link className='x' to='/booknow'>Book an appointment now</Link>
            </div>
        
            <div className='newNavFlex'>

                
                <p className='logout'>Logout</p>
                

            </div>

        </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.fetchUserInfoReducer.userInfo
    }
}

export default connect(mapStateToProps, { fetchUserInfo })(DashHeader);