import React from 'react';
import { connect } from 'react-redux';

import { postUserRatings } from '../../actions/appActions.js';
import './Dashboard.css';





class RateService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingPosted: false,
            rating: 0,
            provider_id: this.props.service.provider_id,
            user_id: this.props.service.user_id,
            service_id: this.props.service.id
        }
       
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

   handleSubmit = (e) => {
        const userId = localStorage.getItem('uID')
        const body = {
            rating: this.state.rating,
            provider_id: this.state.provider_id,
            user_id: this.state.user_id,
            service_id: this.state.service_id
        }

        this.props.postUserRatings(body);
        this.setState({
            ratingPosted: true
        })
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
                {this.state.ratingPosted ? <div className="rateDone">Thank you for rating your service! Click above on "Rate this service" to dismantle this message...</div> : null}
            </div>
        )
    }
 }

 export default connect(null, { postUserRatings })(RateService);