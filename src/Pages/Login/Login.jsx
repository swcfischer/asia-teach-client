import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { API_ROOT } from 'api-config';
import { storeCurrentUser } from '../../App/appReducer';

import fanPng from '../../assets/fan.png';

import './Login.scss';

const Login = (props) => {
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
      values.email = values.email.toLowerCase();
      axios.post(API_ROOT + '/api/login', values).then((result) => {
        if (result.data.error) {
          return toast.error(result.data.message);
        }
        // axios appears to be changing the case of the header
        // which shouldn't make a difference
        // but it appears to be making a difference
        const token = result.headers['Auth-Token']
          ? result.headers['Auth-Token']
          : result.headers['auth-token'];
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const {
          data: { currentUser },
        } = result;
        props.storeCurrentUser(currentUser);
        props.history.push('/');
      });
    },
  });
  return (
    <React.Fragment>
      <h1 className="base-header-styling">Login</h1>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <img className="logo" src={fanPng} alt="fan logo" />
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
        <div className="input-container">
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              className="password"
              placeholder="Password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="error-form">{formik.errors.password}</div>
          )}
        </div>

        <button className="submit-button" type="submit">
          Log In
        </button>
        <Link className="forgot-password" to="/forgot-password">
          Forgot password?
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
