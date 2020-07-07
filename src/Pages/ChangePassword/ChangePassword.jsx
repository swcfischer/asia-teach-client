import React, { Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ROOT } from 'api-config';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ChangePassword = (props) => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Must be at least 6 characters in length')
        .max(22, 'No more than 22 characters')
        .required('Required'),
      'confirm-password': Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
        .min(6, 'Must be at least 6 characters in length')
        .max(22, 'No more than 22 characters'),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.get(
        API_ROOT + `/api/forgot-password?email=${values.email}`
      );
      if (data.error) {
        return toast.error(data.message);
      }

      return toast.success(data.message);

      // Here is where I want to do the toast notification
      // I also want to have it have a lifespan longer of that of other oens
      // I think I should sennd them to the homepage props.history.push("/")
    },
  });

  const isError = () => {
    return (
      (formik.touched['confirm-password'] &&
        formik.errors['confirm-password']) ||
      (formik.touched.email && formik.errors.email)
    );
  };

  return (
    <Fragment>
      <h1 className="base-header-styling">Forgot Password</h1>
      <form className="forgot-form" onSubmit={formik.handleSubmit}>
        <img className="logo" src="/assets/fan.png" alt="logo" />
        <div className="input-container">
          <label htmlFor="email">
            <input
              type="password"
              name="password"
              id="password"
              className="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
            />
          </label>
          <label htmlFor="confirm-password">
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values['confirm-password']}
              placeholder="Confirm Password"
            />
          </label>
          {isError() && (
            <div className="error-form">
              {formik.errors.email || formik.errors['confirm-password']}
            </div>
          )}
        </div>

        <button className="submit-button" type="submit">
          Reset Password
        </button>
      </form>
    </Fragment>
  );
};

export default withRouter(ChangePassword);
