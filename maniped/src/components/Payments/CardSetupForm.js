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

   axios.get(`http://localhost:4000/api/stripepayments/${userId}/card-wallet`)
    .then( async res => {
      let secret = res.data.client_secret;
      const result = await stripe.confirmCardSetup(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
              //get name from redux for V or just get request to users account in be to get name wither or
            name: 'Ali',
          },
        }
      });
  
      if (result.error) {
        console.log('here:', result.error)
        console.log(result.setupIntent.payment_method)
      } else {
        // The setup has succeeded. Display a success message and send
        ////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // result.setupIntent.payment_method to your server to save the
        // card to a Customer
        console.log('success', result.setupIntent.payment_method)
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