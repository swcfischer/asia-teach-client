import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import './ForgotPassword.scss';

const ForgotPassword = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.get(
        `https://historic-arches-33577.herokuapp.com/api/forgot-password?email=${values.email}`
      );
      if (data.error) {
        return toast.error(data.message);
      }

      // Here is where I want to do the toast notification
      // I also want to have it have a lifespan longer of that of other oens
      // I think I should sennd them to the homepage props.history.push("/")
    },
  });

  return (
    <React.Fragment>
      <h1 className="base-header-styling">Forgot Password</h1>
      <form className="forgot-form" onSubmit={formik.handleSubmit}>
        <img className="logo" src="/assets/fan.png" alt="logo" />
        <div className="input-container">
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              className="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <div className="error-form">{formik.errors.email}</div>
          )}
        </div>

        <button className="submit-button" type="submit">
          Send email
        </button>
        <Link className="login-link" to="/login">
          Or just log in?
        </Link>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
