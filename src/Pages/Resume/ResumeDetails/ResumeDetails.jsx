import React, { useEffect, useState, useCallback } from 'react';
import ReactLoading from 'react-loading';
import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

import { SelectField, TextField } from 'Components/FormFields';
import {
  nationalities,
  educationOptions,
  experienceOptions,
  ageGroups,
  desireStartDateOptions,
  desiredCountry,
} from './inputData';

import { API_ROOT } from 'api-config';

import './ResumeDetails.scss';

const initialValues = {
  name: '',
  email: '',
  nationality: '',
  experience: '',
  education: '',
  desiredCountry: '',
  desiredStartDate: '',
  desiredAgeGroup: '',
};
// right now I have two different types of state
const Details = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState(initialValues);

  const { userUuid } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT + `/api/post-resume/details/${userUuid}`
      );

      if (data) {
        setFormState(data);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [userUuid]);

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  }

  return (
    <div>
      <ul className="base-info-list bring-up">
        <li>Save your progress at the bottom, then click next</li>
        <li>Resumes are updatable</li>
        <li>
          Create a new email address if you do not want to use your primary
          email
        </li>
        <li>
          Feedback is always appreciated and can be done through the Contact Us
          link at the bottom
        </li>
      </ul>

      <div className="base-container resume-container">
        <Formik
          initialValues={formState}
          validationSchema={Yup.object({
            nationality: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
            education: Yup.string().required('Required'),
            experience: Yup.string().required('Required'),
            desiredAgeGroup: Yup.string().required('Required'),
            desiredCountry: Yup.string().required('Required'),
            desiredStartDate: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // setSubmitting figure out what this does
            console.log('values', values);
            async function saveForm() {
              const { data } = await axios.put(
                API_ROOT + `/api/post-resume/details/${userUuid}`,
                values
              );
              setFormState(data);
              // delete data.uuid;
              // delete data.updatedAt;
              // setFormState(data);
            }
            saveForm();
          }}
        >
          <Form className="resume-form">
            <TextField label="Name" name="name" type="text" />
            <TextField label="Email" name="email" type="email" />
            <SelectField
              name="nationality"
              label="Nationality"
              placeholder=""
              options={nationalities}
            />
            <br />
            <br />
            <br />
            <SelectField
              name="education"
              label="Education"
              options={educationOptions}
            />
            <SelectField
              name="experience"
              label="Years of Experience"
              options={experienceOptions}
            />
            <SelectField
              name="desiredCountry"
              label="Desired Country"
              options={desiredCountry}
            />
            <br />
            <br />
            <br />
            <SelectField
              name="desiredStartDate"
              label="Desired Start Date"
              options={desireStartDateOptions}
            />
            <SelectField
              name="desiredAgeGroup"
              label="Desired Age Group"
              options={ageGroups}
            />
            <br />
            <br />
            <br />
            <br />
            <div className="btn-container">
              <button className="btn btn-green" type="submit">
                Save
              </button>
              <ConditionalNextBtn userUuid={userUuid} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const ConditionalNextBtn = (props) => {
  const { userUuid } = props;
  const { values } = useFormikContext();
  console.log('ConditionalNextBtn -> values', values);

  const isValidBtn = useCallback(() => {
    let isValid = true;

    for (const key in values) {
      if (!values[key]) {
        isValid = false;
      }
    }

    return isValid;
  }, [values]);

  return (
    <Link
      className={classNames('btn', 'btn-blue', 'details-next-btn', {
        'disable-resume-next-btn': !isValidBtn(),
      })}
      to={`/post-resume/profile-image/${userUuid}`}
    >
      Next
    </Link>
  );
};

export default Details;
