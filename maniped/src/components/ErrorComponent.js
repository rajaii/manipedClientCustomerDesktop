import React from 'react';




class ErrorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <p>Error HERE</p>
            </div>
        )
    }
 }
//don't wire to redux, pass errors from moter components as props to here so can reuse this
 export default ErrorComponent;