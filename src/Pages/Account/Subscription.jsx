import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { API_ROOT } from 'api-config';

import './Subscription.scss';

const Subscription = (props) => {
  const { currentUser } = props;
  const [isActive, setActive] = useState();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT +
          `/api/subscription/${currentUser.uuid}/${currentUser.subscriptionId}`
      );

      setActive(data.isActive === 'active');

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
    onSubmit: async (values) => {
      if (isActive) {
        axios
          .post(
            API_ROOT +
              `/api/subscription/cancel/${currentUser.uuid}/${currentUser.subscriptionId}`
          )
          .then((result) => {
            if (result.data.error) {
              return toast.error(result.data.message);
            } else {
              return toast.success(result.data.message);
            }
          });
      } else {
        const { data } = await axios.post(
          API_ROOT +
            `/api/subscription/renew/${currentUser.uuid}/${currentUser.subscriptionId}`
        );
      }
    },
  });

  return (
    <React.Fragment>
      <div className="base-container subscription-container">
        <form onSubmit={formik.handleSubmit}>
          <h3>Subscription Info</h3>
          <p>
            You subscription to the resume board is{' '}
            <strong>{isActive ? 'active' : 'not active'}</strong>
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
              {isActive ? 'De-activate subscription' : 'Activate'}
            </button>
          </div>
        </form>
      </div>
      <div className="divider"></div>
    </React.Fragment>
  );
};

export default Subscription;
