import React from 'react';
import { Link } from 'react-router-dom';
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
        let userId = localStorage.getItem("uID");
        let usersName = localStorage.getItem("uName");
        return (
                <div>
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
                                <input className='radio' type="radio" name="distance" value="10" checked={(this.state.distance === '10')} onChange={this.handleChange}/>

                                <label>5 miles</label><br></br>
                                <input className='radio' type="radio" name="distance" value="5" checked={(this.state.distance === '5')} onChange={this.handleChange}/>

                                <label>1 mile</label><br></br>
                                <input className='radio' type="radio" name="distance" value="1" checked={(this.state.distance === '1')} onChange={this.handleChange}/><br></br>
                            </div>
                            
                            <button className="search">Search</button>
                            {this.props.fetchingLocalProviders === true ? <div className='lds-hourglass'>Searching...</div> : null} 
                        </form>

                    </div>

                    <div className='localFlex'>
                        {this.props.localProviders && this.props.localProviders.map(p => {
                            return (
                                <div className='locals'>
                                    <p>Provider: {p.first_name} {p.last_name[0]}</p>
                                    <p>Provider's zip code: {p.zipcode}</p>
                                    <p>Availability: {p.availability}</p>
                                    <p className='aboveLink'>Services and pricing: {p.services_and_pricing_1}, {p.services_and_pricing_2}, {p.services_and_pricing_3}</p>
                                    <Link className='bookLink' to={{pathname: '/booknow', state: {providerId: p.id, userId: userId, provider_name: `${p.first_name} ${p.last_name[0]}`, user_name: usersName}}}>Click here to book this provider</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
        
        )
    }
}

const mapStateToProps = state => {
    return {
        providersInfo: state.providerReducer.providersInfo,
        providerInfo: state.providerReducer.providerInfor,
        localProviders: state.localProviderReducer.localProviders,
        fetchingLocalProviders: state.localProviderReducer.fetchingLocalProviders,
        userId: state.loginReducer.userId
    }
}

export default connect(mapStateToProps, { fetchProvidersInfo, fetchProviderInfo, fetchLocalProviders })(ProviderSearch);