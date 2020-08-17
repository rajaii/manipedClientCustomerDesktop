import React from 'react';
import { connect } from 'react-redux';

import './Dashboard.css';

class RateService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='ratewrap'>
                <p>RATE HERE</p>
            </div>
        )
    }
 }

 export default connect(null, {})(RateService);