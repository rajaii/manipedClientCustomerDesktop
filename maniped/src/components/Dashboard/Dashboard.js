import React from 'react';
import DashHeader from './DashHeader.js';
import Feed from './Feed.js';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className='dash'>
                    <DashHeader />
                              
                </div>

                <Feed/> 
            </div>
        )
        
    }
}

export default DashBoard;