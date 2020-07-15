import React from 'react';
import DashHeader from './DashHeader.js';
import DashSubHeader from './DashSubHeader.js';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <DashHeader />
                <DashSubHeader/>
            </div>
        )
        
    }
}

export default DashBoard;