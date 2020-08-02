import React, { useEffect, useState, Fragment } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { API_ROOT } from 'api-config';

import './Subscription.scss';

const Subscription = (props) => {
  const { currentUser, isActive, isCancelAtEnd, setCancelAtEnd } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(props.email)
        .required('Must match current email'),
    }),
    onSubmit: async (values, actions) => {
      if (values.email !== currentUser.email) {
        return toast.error('Email does not match.');
      }
      const { data } = await axios.post(
        API_ROOT +
          `/api/subscription/toggle/${currentUser.uuid}/${currentUser.subscriptionId}`
      );

      setCancelAtEnd(data.cancelAtPeriodEnd);
      actions.resetForm();
    },
  });

  return (
    <Fragment>
      <h1 className="base-header-styling">Subscription</h1>
      <div className="base-container subscription-container">
        <form onSubmit={formik.handleSubmit}>
          <h3>Subscription Info</h3>
          <p>
            Your subscription to the resume board is <strong>{isActive}</strong>
          </p>
          <div className="lower-container">
            <div className="input-container">
              <label htmlFor="email">
                <input
                  type="text"
                  name="email"
                  className="email"
                  placeholder="Email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </label>
              {formik.touched.email && formik.errors.email && (
                <div className="error-form">{formik.errors.email}</div>
              )}
            </div>
            <button type="submit" className="deactivate-btn btn btn-orange">
              {isCancelAtEnd ? 'Enable Recurring' : 'Cancel Recurring'}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Subscription;
