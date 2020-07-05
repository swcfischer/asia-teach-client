import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_ROOT } from 'api-config';

// import ReCAPTCHA from 'react-google-recaptcha';

import './Register.scss';

const Register = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Must be at least 6 character')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.post(API_ROOT + '/api/register', values);
      if (data.error) {
        return toast.error(data.message);
      }
      toast.success(data.message);
    },
  });

  return (
    <React.Fragment>
      <h1 className="base-header-styling">Register</h1>
      <ul className="base-info-list">
        <li>
          <strong>Must have an account in order to </strong>
          <ul className="base-info-list">
            <li>Post a resume</li>
            <li>Buy job credits</li>
            <li>Access to Resume Board</li>
          </ul>
        </li>
      </ul>
      <form className="register-form" onSubmit={formik.handleSubmit}>
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
        <div className="input-container">
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              className="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>

          {formik.touched.password && formik.errors.password && (
            <div className="error-form">{formik.errors.password}</div>
          )}
        </div>
        {/* <ReCAPTCHA
          sitekey="6LfQlKoZAAAAANEbt5Q__iJD-NqvpJwUutyuSSAH"
          onChange={(arg) => {
            console.log('arg', arg);
          }}
          className="google-captcha"
        /> */}
        <button className="submit-button" type="submit">
          Sign up
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
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
