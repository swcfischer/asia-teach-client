import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import classNames from 'classnames';

import { TextField, SelectCity, SelectField } from 'Components/FormFields';

import { compareTwoValues, turnNullValuesToStrings } from 'utilities';

import './JobDetails.scss';

import {
  countryOptions,
  startDateOptions,
  classSizeOptions,
  ageGroupOptions,
  durationOptions,
  initialValues,
} from './options.js';

const Details = (props) => {
  const { currentUser } = props;
  const history = useHistory();
  const match = useRouteMatch();
  const [isLoading, setLoading] = useState(true);
  const [formState, setFormState] = useState(initialValues);
  const { uuid } = match.params;

  useEffect(() => {
    async function fetchJobData() {
      const { data } = await axios.get(
        `https://historic-arches-33577.herokuapp.com/api/jobs/details/${uuid}/${currentUser.uuid}`
      );
      console.log('data', data);
      const newDataObj = turnNullValuesToStrings(data);
      setFormState(newDataObj);

      setLoading(false);
    }
    fetchJobData();
  }, [history, currentUser, uuid]);

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  }
  return (
    <div className="post-job-container">
      <Formik
        initialValues={formState}
        validationSchema={Yup.object({
          companyName: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          pay: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .notRequired(),
          country: Yup.string().required('Required'),
          city: Yup.string().min(2, 'Required').required('Required'),
          classSize: Yup.string().required('Required'),
          ageGroup: Yup.string().required('Required'),
          startDate: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // setSubmitting figure out what this does
          async function saveForm() {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(
              `https://historic-arches-33577.herokuapp.com/api/jobs/details/${uuid}/${currentUser.uuid}`,
              values
            );
            delete data.uuid;
            delete data.updatedAt;
            setFormState(data);
          }
          saveForm();
        }}
      >
        <Form className="post-job-form">
          <Link to="/post-job" className="btn btn-orange back-btn">
            Back
          </Link>
          <TextField label="Company Name" name="companyName" />
          <TextField label="Email" name="email" type="email" />
          <div className="separator-md" />
          <SelectField
            label="Country"
            name="country"
            placeholder=""
            options={countryOptions}
          />
          <SelectCity label="City" name="city" type="select" placeholder="" />
          <div className="separator-lg" />
          <TextField label="Pay" name="pay" placeholder="" />
          <SelectField
            label="Age Group"
            name="ageGroup"
            placeholder=""
            options={ageGroupOptions}
          />
          <SelectField
            label="Select Duration"
            name="duration"
            placeholder=""
            options={durationOptions}
          />
          <div className="separator-md" />
          <SelectField
            label="Class Size"
            name="classSize"
            placeholder=""
            options={classSizeOptions}
          />
          <SelectField
            label="Start Date"
            name="startDate"
            placeholder=""
            options={startDateOptions}
          />
          <div className="separator-md" />
          <TextField label="Phone" name="phone" />
          <TextField label="Application Link" name="link" placeholder="" />
          {/* <TextField
            label="WeChat"
            name="wechat"
            placeholder="Make conditional on country choice"
          /> */}
          <button className="btn save-button" type="submit">
            Save
          </button>
          <NextButton formState={formState} uuid={uuid} />
        </Form>
      </Formik>
    </div>
  );
};

const NextButton = (props) => {
  const formikContext = useFormikContext();
  const values = formikContext.values;

  // this logic doesn't quite work yet
  const isFormNotReady = useMemo(() => {
    const notRequiredValues = ['phone', 'link', 'pay'];
    return compareTwoValues(values, props.formState, notRequiredValues);
  }, [values, props.formState]);
  return (
    <Link
      to={`/post-job/stepper/description/${props.uuid}`}
      className={classNames('next-button', {
        'next-disabled': isFormNotReady,
      })}
    >
      <button className="btn">Next</button>
    </Link>
  );
};

// this doesn't seem to need redux;
// I will need to be able to block this page if
// the user is not logged in
const mapStateToProps = (state) => {
  return { ...state.postJob, currentUser: state.app.currentUser };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Details);
