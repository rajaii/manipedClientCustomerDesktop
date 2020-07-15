import React from 'react';
import { connect } from 'react-redux';



class DashSubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        //call action to do get to http://localhost:4000/api/available_services so have available on props
    }

    render() {
        return (
            <div>
                DashSubHeader 
            </div>
        )
        
    }
}

export default DashSubHeader;