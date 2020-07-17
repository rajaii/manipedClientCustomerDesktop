import React from 'react';

import { connect } from 'react-redux';

import { fetchProviderInfo, fetchProvidersInfo } from '../actions/appActions.js';
import './Login.css'; 

//will need to pullin zipcode api


class ProviderSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zipcode: '',
        }
    }


    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit (e) {
        e.preventDefault();
        
       
    }

    render () {
        return (
        <div className='searchCont'>

            <form className='searchCont' type='submit' onSubmit={this.handleSubmit}>
                <h1 className="existing">Enter your zipcode here to find providers near you:</h1>
                <input 
                type='text'
                name='zipcode'
                value={this.state.zipcode}
                placeholder='zipcode'
                onChange={this.handleChange}
                />
                <button>Search</button>
                {/* {this.props.loggingIn === true ? <div className='lds-hourglass'>Logging In...</div> : null} */}
            </form>

        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        providersInfo: state.providerReducer.providersInfo,
        providerInfo: state.providerReducer.providerInfor
    }
}

export default connect(mapStateToProps, { fetchProvidersInfo, fetchProviderInfo })(ProviderSearch);