import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions.js';


import './Nav.css';

function Nav (props) {

    function handleLogout(e)  {
        e.preventDefault();
        props.logout();
    }

    return (
       
      <div className={props.isLoggedIn ? 'hide' : null}>
        <div className='search' id='sticky'>

            <div>

                <div className='frontFlex'>

                    {/* <img src='./logo.png'/>
                    <p> | </p> */}

                    <p className='p2'>maniPed</p>
                    
                </div>
                
            </div>
        
            <div className='navFlex'>

                <Link className='p' to='/'>Home</Link>
                <Link className='p' to='/about'>About</Link>
                <Link className='p' to='/services'>Services</Link>
                {/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                {props.isLoggedIn ? <p onClick={handleLogout} className='logout'>Logout</p> : <Link className='p' to='/login'>Login</Link>}
                {props.isLoggedIn ? null : <Link className='p' to='/register'>Signup</Link>}

            </div>

        </div>
    </div>  
    
    )
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, { logout })(Nav);