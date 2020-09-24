import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_ROOT } from 'api-config';
import { storeCurrentUser } from '../../App/appReducer';

import './RegisterWithFreeJob.scss';

const RegisterWithFreeJob = (props) => {
  const { uuid } = useParams();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Must be at least 6 character')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      const result = await axios.post(
        API_ROOT + '/api/coupon/create-account-with-job',
        { ...values, code: uuid }
      );
      const { data } = result;
      if (data.error) {
        return toast.error(data.message);
      }
      toast.success(data.message);
      const token = result.headers['Auth-Token']
        ? result.headers['Auth-Token']
        : result.headers['auth-token'];
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { currentUser } = data;
      props.storeCurrentUser(currentUser);
      props.history.push('/account');
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
      <form className="special-register-form" onSubmit={formik.handleSubmit}>
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
        <label htmlFor="password2">
          <input
            type="password2"
            name="password2"
            id="password2"
            className="password2"
            placeholder="Password2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
          />
        </label>
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ storeCurrentUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterWithFreeJob);
