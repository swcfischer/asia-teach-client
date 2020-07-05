import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import './Sidebar.scss';

const options = [
  { label: 'China', value: 'china' },
  { label: 'Indonesia', value: 'indonesia' },
  { label: 'Japan', value: 'japan' },
  { label: 'South Korea', value: 'south-korea' },
  { label: 'Taiwan', value: 'taiwan' },
  { label: 'Thailand', value: 'thailand' },
  { label: 'Vietnam', value: 'vietnam' },
];

const ageGroupOptions = [
  { label: 'Adults', value: 'adults' },
  { label: 'Adolescents', value: 'adolescents' },
  { label: 'Children', value: 'children' },
];

const Sidebar = (props) => (
  <div className="sidebar">
    <Select
      placeholder="Select a country"
      options={options}
      value={options.find((el) => el.value === props.params.country)}
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('country')}
    />
    <br />
    <br />
    <Select
      placeholder="Select a city"
      options={props.cities.sort()}
      value={
        props.params.city
          ? { label: props.params.city, value: props.params.city }
          : ''
      }
      className="react-select-container"
      classNamePrefix="search-select"
      onChange={props.handleSearchQuery('city')}
      isLoading={props.isLoadingCities}
      isClearable
    />
    <br />
    <br />
    <Select
      placeholder="Select an age group"
      options={ageGroupOptions}
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
