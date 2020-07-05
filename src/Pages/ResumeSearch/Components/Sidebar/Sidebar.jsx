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
      placeholder="Experience"
      options={[]}
      value={
        props.params.ageGroup
          ? { label: props.params.ageGroup, value: props.params.ageGroup }
          : ''
      }
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('ageGroup')}
      isClearable
    />
    <br />
    <br />
    {/*  
      <Select
        placeholder="Select a subject"
        options={ageGroupOptions}
        value={props.params.students}
        className="react-select-container"
        classNamePrefix="search-select"
        onChange={props.handleAgeGroupQuery}
        isClearable={true}
      />
    */}
  </div>
);
export default withRouter(Sidebar);
