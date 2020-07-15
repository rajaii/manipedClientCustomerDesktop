import React from 'react';
import { Link } from 'react-router-dom';

import '../Nav.css';

class DashHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                <p className='p2'>Welcome USER</p>
                <Link className='x' to='/booknow'>Book an appointment now</Link>
            </div>
        
            <div className='newNavFlex'>

                
                <p className='logout'>Logout</p>
                

            </div>

        </div>
        )
        
    }
}

export default DashHeader;