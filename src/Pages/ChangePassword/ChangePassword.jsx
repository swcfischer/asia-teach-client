import React, { Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ROOT } from 'api-config';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import './ChangePassword.scss';

const ChangePassword = (props) => {
  const { token } = props.match.params;
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Must be at least 6 characters in length')
        .max(22, 'No more than 22 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
        .min(6, 'Must be at least 6 characters in length')
        .max(22, 'No more than 22 characters'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const { data } = await axios.post(API_ROOT + `/api/set-forgot-password`, {
        ...values,
        token,
      });

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
      (formik.touched.confirmPassword && formik.errors.confirmPassword) ||
      (formik.touched.email && formik.errors.email)
    );
  };

  return (
    <Fragment>
      <h1 className="base-header-styling">Forgot Password</h1>
      <form className="change-password-form" onSubmit={formik.handleSubmit}>
        <img className="logo" src="/assets/fan.png" alt="logo" />
        <div className="input-container">
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              className="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
            />
          </label>
          <label htmlFor="confirmPassword">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="confirm-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Confirm Password"
            />
          </label>
          {isError() && (
            <div className="error-form">
              {formik.errors.email || formik.errors.confirmPassword}
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
