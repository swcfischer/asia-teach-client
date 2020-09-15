import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Photos from './components/Photos/Photos';

import { clearState } from '../Search/reducer';

import './Home.scss';

const options = [
  { label: 'China', value: 'china' },
  { label: 'Indonesia', value: 'indonesia' },
  { label: 'Japan', value: 'japan' },
  { label: 'South Korea', value: 'south-korea' },
  { label: 'Taiwan', value: 'taiwan' },
  { label: 'Thailand', value: 'thailand' },
  { label: 'Vietnam', value: 'vietnam' },
];

class Home extends Component {
  componentDidMount() {
    document.title = 'Asia-Teach';
    this.props.clearState();
    window.scrollTo({ top: 0 });
  }

  componentWillUnmount() {
    window.scrollTo({ top: 0 });
  }

  render() {
    return (
      <div className="homepage-parent">
        <div className="search-box">
          <div className="mobile-nav">
            <div className="logo"></div>
            <h1 className="logo-text">Asia-Teach</h1>
          </div>
          <div className="gradient"></div>
          <Select
            placeholder="Select a country"
            options={options}
            className="react-select-container"
            classNamePrefix="home-select"
            onChange={(selectedObj) => {
              this.props.history.push(
                `/jobs?country=${selectedObj.value}&page=1`
              );
            }}
            isSearchable={false}
          />
        </div>
        <h2 className="content-header">Where do you want to go?</h2>
        <h4 className="content-subheader">
          Each destination is its own mix of pros and cons. Knowing what you are
          going to experience is a great way to be prepared.
        </h4>
        {/* These are photo links to country searchs */}
        <Photos />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clearState }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(Home));
