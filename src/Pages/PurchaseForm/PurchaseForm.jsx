import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import { FaStripe } from 'react-icons/fa';
import AcceptCard from 'assets/accepted_cards.png';

import { API_ROOT } from 'api-config';

import './PurchaseForm.scss';
const stripePromise = loadStripe('pk_test_Cm3mbl5Qa4v6DZXHtRTS29Kp00hn4kDF06');
// 'pk_live_20UYqDxIye4WGPS1cqr025GK00hnVogbae'

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
  const [total] = useState(priceDictionary[price]);
  const [isDisabled, setDisabled] = useState(false);
  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setDisabled(true);
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
      setDisabled(false);
      return toast.error('Payment did not go through.');
      // Show error to your customer (e.g., insufficient funds)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        return toast.success('Payment was successful');
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
        <div className="stripe-icon-container">
          <FaStripe />
        </div>

        <div className="accepted-cards">
          <img src={AcceptCard} alt="cards accepted" />
        </div>
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
            <button
              disabled={isDisabled}
              className={classNames('btn-blue btn purchase-btn', {
                disabled: isDisabled,
              })}
            >
              Pay ${total}
            </button>
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
