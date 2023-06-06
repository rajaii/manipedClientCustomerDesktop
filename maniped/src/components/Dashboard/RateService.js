import React from 'react';
import { connect } from 'react-redux';

import { postUserRatings } from '../../actions/appActions.js';
import ErrorComponent from '../ErrorComponent.js';
import './Dashboard.css';





class RateService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingPosted: false,
            displayError: false,
            rating: 0,
            provider_id: this.props.service.provider_id,
            user_id: this.props.service.user_id,
            service_id: this.props.service.id
        }
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

   async handleSubmit (e) {
       
        
        const body = {
            rating: this.state.rating,
            provider_id: this.state.provider_id,
            user_id: this.state.user_id,
            service_id: this.state.service_id
        }

        const res = await this.props.postUserRatings(body)

        if (res && res.payload.data.message === "please provide a rating to rate your provider...") {
            this.setState({
                ratingPosted: true,
                displayError: true
            })
            return;
        } else {
        this.setState({
            ratingPosted: true
        })
    }
}

    render() {
        return (
            <div>
                <div className={this.state.ratingPosted ? 'hideRatingForm' : 'rateWrapper'}>
                    <form className="rating">
                        <label>
                            <input onChange={this.handleChange} type="radio" name="rating" value="1" />
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input onChange={this.handleChange} type="radio" name="rating" value="2" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input onChange={this.handleChange} type="radio" name="rating" value="3" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>   
                        </label>
                        <label>
                            <input onChange={this.handleChange} type="radio" name="rating" value="4" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input onChange={this.handleChange} type="radio" name="rating" value="5" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                    </form>
                    <button className='rateButton' onClick={this.handleSubmit}>Submit Rating</button>
                </div>
                {this.state.ratingPosted && this.state.displayError ? <ErrorComponent error='Please provide a rating to rate this service...' /> : null}
                {this.state.ratingPosted && !this.state.displayError ? <div className="rateDone">Thank you for rating your service! Click above on "Rate this service" to dismantle this message...</div> : null}
            </div>
        )
    }
 }

 export default connect(null, { postUserRatings })(RateService);