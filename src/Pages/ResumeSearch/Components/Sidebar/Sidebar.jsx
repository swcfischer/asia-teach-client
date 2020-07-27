import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import './Sidebar.scss';

const nationalityOptions = [
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Ireland', value: 'Ireland' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'New Zealand', value: 'New Zealand' },
  { label: 'Australia', value: 'Australia' },
];

const educationOptions = [
  { label: 'High School', value: 'High School' },
  { label: 'Bachelors', value: 'Bachelors' },
  { label: 'Masters', value: 'Masters' },
  { label: 'Phd', value: 'Phd' },
];

// make this search 0 - 2 3 - 7 7+
const yearsOfExperience = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10+', value: '10+' },
];

const desiredCountryOptions = [
  { label: 'China', value: 'China' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Japan', value: 'Japan' },
  { label: 'South Korea', value: 'South Korea' },
  { label: 'Taiwan', value: 'Taiwan' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Vietnam', value: 'Vietnam' },
];

export const desireStartDateOptions = [
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'June', value: 'June' },
  { label: 'July', value: 'July' },
  { label: 'August', value: 'August' },
  { label: 'September', value: 'September' },
  { label: 'October', value: 'October' },
  { label: 'November', value: 'November' },
  { label: 'December', value: 'December' },
  { label: 'January', value: 'January' },
];

const desiredAgeGroupOptions = [
  { label: 'Children', value: 'Children' },
  { label: 'Adolescents', value: 'Adolescents' },
  { label: 'University', value: 'University' },
  { label: 'Adults', value: 'Adults' },
];

const Sidebar = (props) => (
  <div className="sidebar">
    <Select
      placeholder="Nationality"
      options={nationalityOptions}
      value={nationalityOptions.find(
        (el) => el.value === props.params.nationality
      )}
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('nationality')}
      isClearable
    />
    <br />
    <br />
    <Select
      placeholder="Education"
      options={educationOptions}
      value={
        props.params.education
          ? { label: props.params.education, value: props.params.education }
          : ''
      }
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('education')}
      isClearable
    />
    <br />
    <br />
    <Select
      placeholder="Years of experience"
      options={yearsOfExperience}
      value={
        props.params.experience
          ? { label: props.params.experience, value: props.params.experience }
          : ''
      }
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('experience')}
      isClearable
    />
    <br />
    <br />
    <Select
      placeholder="Desired country"
      options={desiredCountryOptions}
      value={
        props.params.desiredCountry
          ? {
              label: props.params.desiredCountry,
              value: props.params.desiredCountry,
            }
          : ''
      }
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('desiredCountry')}
      isClearable
    />
    <br />
    <br />
    <Select
      placeholder="Desired start date"
      options={desireStartDateOptions}
      value={
        props.params.desiredStartDate
          ? {
              label: props.params.desiredStartDate,
              value: props.params.desiredStartDate,
            }
          : ''
      }
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('desiredStartDate')}
      isClearable
    />
    <br />
    <br />
    <Select
      placeholder="Desired Age Group"
      options={desiredAgeGroupOptions}
      value={props.params.students}
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('desiredAgeGroup')}
      isClearable={true}
    />
  </div>
);
export default withRouter(Sidebar);
