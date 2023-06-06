import React, { useEffect } from 'react';
import axios from 'axios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

import { fetchUserInfo } from '../../actions/appActions.js';
import CardSection from './CardSection';




function CardSetupForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const userId = localStorage.getItem('uID');
    props.fetchUserInfo(userId);
  }, [])

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
   const userId = localStorage.getItem('uID');

   axios.get(`http://localhost:4000/api/stripepayments/${userId}/card-wallet`)
    .then( async res => {
      let secret = res.data.client_secret;
      const result = await stripe.confirmCardSetup(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
              
            name: `${props.firstName} ${props.lastName}`,
          },
        }
      });
      
      if (result.error) {
        window.confirm(`${JSON.stringify(result.error.decline_code)} Please enter a new card and try again...`)
      } else {
        // The setup has succeeded. Display a success message and send
        // result.setupIntent.payment_method to your server to save the
        // card to a Customer
        alert('Thank you. You have successfully entered your card information.')
        props.history.push('/dashboard')
      }
    })
    .catch(err => {
      console.log(err)
    })

   

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Save Card</button>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    firstName: state.userInfoReducer.userInfo.first_name,
    lastName: state.userInfoReducer.userInfo.last_name
  }
}
 
export default connect(mapStateToProps, { fetchUserInfo })(CardSetupForm);