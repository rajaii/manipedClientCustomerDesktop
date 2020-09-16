import React from 'react';
import axios from 'axios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CardSetupForm() {
  const stripe = useStripe();
  const elements = useElements();

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
    console.log(userId)
   axios.get(`http://localhost:4000/card-wallet`)
    .then( async res => {
      console.log(res)
      let secret = res.data.client_secret;
      const result = await stripe.confirmCardSetup(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
              //get name in V
            name: 'Ali',
          },
        }
      });
  
      if (result.error) {
        console.log('here:', result.error)
      } else {
        // The setup has succeeded. Display a success message and send
        // result.setupIntent.payment_method to your server to save the
        // card to a Customer
        console.log('success');
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