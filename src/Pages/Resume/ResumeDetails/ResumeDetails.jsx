import React, { useEffect, useState, useCallback } from 'react';
import ReactLoading from 'react-loading';
import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

import { SelectField, TextField } from 'Components/FormFields';
// import ProfileCrop from '../ProfileCrop';
// import ResumeText from './ResumeText';

import './ResumeDetails.scss';

const initialValues = {
  name: '',
  email: '',
  nationality: '',
  experience: '',
  education: '',
};
// right now I have two different types of state
const Details = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState(initialValues);

  const { userUuid } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `https://historic-arches-33577.herokuapp.com/api/post-resume/details/${userUuid}`
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
        <li>Feedback is always appreciated</li>
      </ul>

      <div className="base-container resume-container">
        <Formik
          initialValues={formState}
          validationSchema={Yup.object({
            nationality: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
            education: Yup.string().required('Required'),
            experience: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // setSubmitting figure out what this does
            async function saveForm() {
              const { data } = await axios.put(
                `https://historic-arches-33577.herokuapp.com/api/post-resume/details/${userUuid}`,
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
              options={[
                { label: 'United States of America', value: 'usa' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Canada', value: 'canada' },
                { label: 'Ireland', value: 'ireland' },
                { label: 'South Africa', value: 'southAfrica' },
                { label: 'New Zealand', value: 'newZealand' },
                { label: 'Australia', value: 'australia' },
              ]}
            />
            <br />
            <br />
            <SelectField
              name="education"
              label="Education"
              placeholder=""
              options={[
                { label: 'High School or equivalent', value: 'hs' },
                { label: 'Bachelors', value: 'bachelors' },
                { label: 'Masters', value: 'masters' },
                { label: 'Phd', value: 'phd' },
              ]}
            />
            <SelectField
              name="experience"
              label="Years of experience"
              placeholder=""
              options={[
                { label: '0', value: '0' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10+', value: '10+ ' },
              ]}
            />
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
