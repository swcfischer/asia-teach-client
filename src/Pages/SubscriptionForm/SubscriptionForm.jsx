import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import { storeSubscriptionId } from 'App/appReducer';
import { FaStripe } from 'react-icons/fa';
import AcceptCard from 'assets/accepted_cards.png';

import { API_ROOT } from 'api-config';

import './SubscriptionForm.scss';

// const stripePromise = loadStripe('pk_test_Cm3mbl5Qa4v6DZXHtRTS29Kp00hn4kDF06');
const stripePromise = loadStripe('pk_live_20UYqDxIye4WGPS1cqr025GK00hnVogbae');
// 'pk_live_20UYqDxIye4WGPS1cqr025GK00hnVogbae'

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

function PurchaseForm({ userUuid, email, storeSubscriptionId }) {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setButtonDisabled(true);
    const {
      data: { client_secret, customerId },
    } = await axios.post(API_ROOT + `/api/sub-intent/`, {
      userUuid,
    });

    const setupRes = await stripe.confirmCardSetup(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email,
        },
      },
    });

    const { data } = await axios.post(API_ROOT + '/api/sub-payment', {
      customerId: customerId,
      paymentMethodId: setupRes.setupIntent.payment_method,
      userUuid,
    });

    setLoading(false);

    if (data.status === 'active') {
      storeSubscriptionId(data.id);
      toast.success('Payment was sucessful. May take a moment to process');
      history.push('/');
    } else {
      return toast.error('Payment did not go through');
    }
  };

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  }

  return (
    <div className="subscription-form-container">
      <h1 className="base-header-styling">Checkout</h1>
      <ul className="base-info-list">
        <li>$55 for one month's access</li>
        <li>Can update subscription status in Account page</li>
      </ul>
      <div className="form-container">
        <div className="checkout-info">Subscribe to Resume Board</div>
        <div className="stripe-icon">
          <FaStripe />
        </div>
        <div className="card-payments">
          <img src={AcceptCard} alt="cards accepted" />
        </div>
        <form
          className="form-element"
          onSubmit={handleSubmit}
          style={{ width: '380px', margin: '0 auto' }}
        >
          <CardElement options={cardElementOpts} />

          <div className="btn-container">
            <button
              disabled={isButtonDisabled}
              className={classNames('btn-blue btn purchase-btn', {
                disabled: isButtonDisabled,
              })}
            >
              Pay $55
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const SubscriptionForm = ({ userUuid, storeSubscriptionId }) => {
  return (
    <Elements stripe={stripePromise}>
      <PurchaseForm
        userUuid={userUuid}
        storeSubscriptionId={storeSubscriptionId}
      />
    </Elements>
  );
};

const mapStateToProps = (state) => {
  return {
    userUuid: state.app.currentUser.uuid,
    email: state.app.currentUser.email,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ storeSubscriptionId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionForm);
