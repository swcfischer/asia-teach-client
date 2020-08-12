import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { API_ROOT } from 'api-config';

import './ContactUs.scss';

const ContactUs = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      subject: '',
      text: '',
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .min(10, 'Must be at least 10 characters')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      axios.post(API_ROOT + '/api/contact-us', values).then((result) => {
        if (result.data.error) {
          return toast.error(result.data.message);
        } else {
          return toast.success(result.data.message);
        }
      });
    },
  });
  return (
    <React.Fragment>
      {/* <h1 className="base-header-styling">Contact Us</h1> */}
      <form className="contact-us-form" onSubmit={formik.handleSubmit}>
        <img className="logo" src="/assets/fan.png" alt="fan logo" />
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
        <label htmlFor="subject">
          <input
            type="text"
            name="subject"
            className="subject"
            placeholder="Subject"
            id="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
          />
        </label>
        <div className="input-container">
          <label htmlFor="text">
            <textarea
              type="text"
              name="text"
              className="text"
              placeholder="Type message here"
              id="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
            />
          </label>
          {formik.touched.text && formik.errors.text && (
            <div className="error-form">{formik.errors.text}</div>
          )}
        </div>

        <button className="submit-button btn btn-blue" type="submit">
          Send
        </button>
      </form>
    </React.Fragment>
  );
};

export default ContactUs;
