import React from "react";
import {render} from "react-dom";
import {loadStripe} from "@stripe/stripe-js";
import Button from '@mui/material/Button';
import CoffeeIcon from '@mui/icons-material/Coffee';

const stripeLoadedPromise = loadStripe('pk_test_51JksXdLSxeQR77uq0EOXUJVdsOMkf2XgkRCZ4sWXXO053HDo6JvgOkwO8l5sQhCxpb9lLn48kZxoi96rpW4IORX900v8p04h1G');

export default function StripeButton() {
  async function handleCheckoutClick() {
    const stripe = await stripeLoadedPromise;
    try {
      const result = await stripe.redirectToCheckout({
        lineItems: [{
            price: 'price_1Jksg8LSxeQR77uql6EVkXUL',
            quantity: 1,
          }],
          mode: 'payment',
          successUrl: 'http://localhost:8080/',
          cancelUrl: 'http://localhost:8080/',
      });
      console.log(result.error);
    } catch(e) {
      console.log(error);
    }

  }
  
  return <Button color='inherit' onClick={handleCheckoutClick}>
    <CoffeeIcon sx={{ml: 1}} />
  </Button>;
}