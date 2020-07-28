import React, { useEffect, useState, Fragment } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { API_ROOT } from 'api-config';

import './Subscription.scss';

const Subscription = (props) => {
  const { currentUser } = props;
  const [isActive, setActive] = useState();
  const [isRenew, setRenew] = useState();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT +
          `/api/subscription/${currentUser.uuid}/${currentUser.subscriptionId}`
      );

      setActive(data.status);
      setRenew(data.isRenew);

      // const result = await axios.get('/something something');
    }

    fetchData();
  }, []);

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
      const { data } = await axios.post(
        API_ROOT +
          `/api/subscription/toggle/${currentUser.uuid}/${currentUser.subscriptionId}`
      );

      setRenew(data.isRenew);
      actions.resetForm();
    },
  });

  if (isActive !== 'active') {
    return null;
  }

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
            <button className="deactivate-btn btn btn-orange">
              {isRenew ? 'Cancel Recurring' : 'Enable Recurring'}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Subscription;
