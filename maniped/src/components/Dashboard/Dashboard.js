import React from 'react';
import DashHeader from './DashHeader.js';
import DashSubHeader from './DashSubHeader.js';
import Feed from './Feed.js';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='dash'>
                <DashHeader />
                <DashSubHeader />
                <Feed/>            
            </div>
        )
        
    }
}

export default DashBoard;