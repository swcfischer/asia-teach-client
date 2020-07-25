import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { API_ROOT } from 'api-config';

import './PurchaseForm.scss';

const stripePromise = loadStripe('pk_test_Cm3mbl5Qa4v6DZXHtRTS29Kp00hn4kDF06');

const priceDictionary = { one: 65, five: 275, ten: 450 };

const quantityDictionary = { one: 1, five: 5, ten: 10 };

const iframeStyles = {
  base: {
    color: '#000',
    fontSize: '16px',
  },
  invalid: {
    iconColor: '#EA3F33',
    color: '#EA3F33',
  },
  complete: {
    iconColor: '#cbf4c9',
  },
};

const cardElementOpts = {
  // iconStyle: 'solid',
  style: iframeStyles,
  hidePostalCode: true,
};

function PurchaseForm({ userUuid }) {
  const { price } = useParams();
  const [total, setTotal] = useState(priceDictionary[price]);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const {
      data: { client_secret },
    } = await axios.post(API_ROOT + `/api/payments-jobs/`, {
      quantity: price,
      userUuid,
    });

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }

    // const { client_secret } = axios.get
  };

  return (
    <div className="purchase-form-container">
      <h1 className="base-header-styling">Checkout</h1>
      <div className="form-container">
        <div className="checkout-info">
          {quantityDictionary[price]} Job Credit{price !== 'one' && 's'}
        </div>
        <form
          className="form-element"
          onSubmit={handleSubmit}
          style={{ width: '380px', margin: '0 auto' }}
        >
          <CardElement options={cardElementOpts} />

          <div className="btn-container">
            <button className="btn-blue btn purchase-btn">Pay ${total}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const PurchaseFormWrapper = ({ userUuid }) => {
  return (
    <Elements stripe={stripePromise}>
      <PurchaseForm userUuid={userUuid} />
    </Elements>
  );
};

const mapStateToProps = (state) => {
  return {
    userUuid: state.app.currentUser.uuid,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseFormWrapper);
