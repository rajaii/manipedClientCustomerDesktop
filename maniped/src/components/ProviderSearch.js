import React from 'react';
import * as yup from 'yup';

import { connect } from 'react-redux';

import { fetchProviderInfo, fetchProvidersInfo, fetchLocalProviders } from '../actions/appActions.js';
import './Login.css'; 

let zipSearchSchema = yup.object().shape({
    zipCode: yup.string().matches(/^\d{5}([-]|\s*)?(\d{4})?$/, 'Must be valid zip code').required('Zipcode is required'),
 
  });




class ProviderSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCode: '',
            distance: null,
            validationError: {inner: []}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit (e) {
        e.preventDefault();
        const body = {
            zipCode: this.state.zipCode,
            distance: this.state.distance
        }

        zipSearchSchema.validate(this.state, {abortEarly: false})
            .then(d => {
                if (d) {
                    this.props.fetchLocalProviders(body);
                    this.setState({
                        zipCode: '',
                        distance: null,

                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    validationError: err
                })
            })
       
    }

    render () {
        return (
        <div className='searchCont l'>

            <form type='submit' onSubmit={this.handleSubmit}>
                {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Zipcode is required").length > 0 ?  <div className="Error">ZIPCODE IS REQUIRED RE-ENTER AND CLICK SEARCH</div> : null}
                {this.state.validationError && this.state.validationError.inner.filter(i => i.message === "Must be valid zip code").length > 0 ?  <div className="Error">MUST BE A VALID ZIPCODE RE-ENTER AND CLICK SEARCH</div> : null}

                <h1 className="searchLabel">Enter your zipcode here to find providers near you:</h1>
                <label>Zipcode:</label><br></br>
                <input 
                type='text'
                name='zipCode'
                value={this.state.zipCode}
                placeholder='zipcode'
                onChange={this.handleChange}
                />

                <h1 className='searchLabel'>Enter the distance of how close you want the list of providers to be from your zipcode</h1><br></br>

                <div className='distanceOptions'>
                    <label>10 miles</label><br></br>
                    <input className='radio' type="radio" name="distance" value="10" onChange={this.handleChange}/>

                    <label>5 miles</label><br></br>
                    <input className='radio' type="radio" name="distance" value="5" onChange={this.handleChange}/>

                    <label>1 mile</label><br></br>
                    <input className='radio' type="radio" name="distance" value="1" onChange={this.handleChange}/><br></br>
                </div>
                
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
        providerInfo: state.providerReducer.providerInfor,
        localProviders: state.localProviderReducer.localProviders,
        fetchingLocalProviders: state.localProviderReducer.fetchLocalProviders
    }
}

export default connect(mapStateToProps, { fetchProvidersInfo, fetchProviderInfo, fetchLocalProviders })(ProviderSearch);