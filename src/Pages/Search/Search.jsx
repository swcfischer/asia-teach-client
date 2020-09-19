import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import queryString from 'query-string';

import Sidebar from './components/Sidebar/Sidebar';
import ResultItem from './components/Results/ResultItem';

import {
  handleSearchQuery,
  setLoading,
  fetchCitiesByCountry,
  storeParams,
  storePage,
} from './reducer';

import './Search.scss';

const countries = {
  thailand: 'Thailand',
  'south-korea': 'South Korea',
  china: 'China',
  japan: 'Japan',
  taiwan: 'Taiwan',
  vietnam: 'Vietnam',
  indonesia: 'Indonesia',
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.resultsContainerRef = React.createRef();
  }

  componentDidMount() {
    // initial data call
    const params = queryString.parse(this.props.location.search);
    // checking if the query parameter for the country matched what I have in redux
    // if not I will fetch new data
    if (this.props.params.country !== params.country) {
      // this.props.storeParams(params);
      this.props.handleSearchQuery(params);
      this.props.fetchCitiesByCountry(params.country);
    }
    if (this.resultsContainerRef && this.resultsContainerRef.current) {
      this.resultsContainerRef.current.scrollTo({
        top: this.props.scrollPosition,
      });
    }

    const paramsPageNumber = Number(params.page);

    if (this.props.page !== paramsPageNumber) {
      this.props.storePage(paramsPageNumber);
    }

    this.setTabTitle();
  }
  componentDidUpdate(prevProps) {
    const prevParams = this.parseQueryParameters(prevProps);
    const currentParams = this.parseQueryParameters(this.props);

    if (this.compareMatchParams(prevParams, currentParams)) {
      // this.props.history.push('/jobs?' + queryParams);
      if (prevParams.country !== currentParams.country) {
        this.props.fetchCitiesByCountry(currentParams.country);
      }

      if (prevParams.page !== currentParams.page) {
        this.props.storePage(currentParams.page);
      }
      this.props.handleSearchQuery(currentParams);
      window.scroll({ top: 0, behavior: 'smooth' });
      this.setTabTitle();
    }
  }

  compareMatchParams = (prev, current) => {
    // * Looks to me that this works
    let isChanged = false;
    for (let queryParam in current) {
      if (prev[queryParam] !== current[queryParam]) {
        isChanged = true;
      }
    }
    for (let queryParam in prev) {
      if (prev[queryParam] !== current[queryParam]) {
        isChanged = true;
      }
    }

    return isChanged;
  };

  handleSearchQuery = (queryName) => (selectedOption) => {
    const newQueryStringsObj = this.parseQueryParameters(this.props);
    newQueryStringsObj.page = 1;

    if (!selectedOption) {
      delete newQueryStringsObj[queryName];
    } else {
      newQueryStringsObj[queryName] = selectedOption.value;
    }

    if (queryName === 'country') {
      delete newQueryStringsObj.city;
    }

    this.props.history.push(
      '/jobs?' + queryString.stringify(newQueryStringsObj)
    );
  };

  setTabTitle = () => {
    const queryStringObj = queryString.parse(this.props.location.search);
    document.title = countries[queryStringObj.country] + ' Jobs';
  };

  parseQueryParameters = (props) => {
    // this does not have to be a method the search component class
    const newQueryStringObj = queryString.parse(props.location.search);
    // I can mutate the object here if I need to
    return newQueryStringObj;
  };

  constructNextPageLink = () => {
    const paramsObj = {
      ...this.props.params,
      page: this.props.page + 1,
    };

    return queryString.stringify(paramsObj);
  };

  constructBackPageLink = () => {
    if (this.props.page === 1) {
      return '';
    }
    const paramsObj = {
      ...this.props.params,
      page: this.props.page - 1,
    };

    return queryString.stringify(paramsObj);
  };

  handleToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  isNextPage = () => {
    return this.props.results && this.props.results.length === 12;
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div className="base-loading-container">
          <ReactLoading color="#000" type="spin" />
        </div>
      );
    }
    return (
      <div className="search-container">
        <div className="container-width">
          <Sidebar
            params={this.props.params}
            handleSearchQuery={this.handleSearchQuery}
            cities={this.props.cities}
            isLoadingCities={this.props.isLoadingCities}
          />
          <div className="results-container">
            {this.props.results && this.props.results.length > 0 ? (
              this.props.results.map((result) => (
                <ResultItem key={result.uuid} {...result} />
              ))
            ) : (
              <div className="no-results">
                Sorry, there are no results for this criteria.
              </div>
            )}
          </div>
        </div>
        <div className="white-bg"></div>
        {this.props.results && this.props.results.length > 5 && (
          <div onClick={this.handleToTop} className="to-top">
            <button>Top</button>
          </div>
        )}
        {this.props.page > 1 && (
          <Link
            className="previous-page"
            to={`/jobs?${this.constructBackPageLink()}`}
          >
            <button>Previous</button>
          </Link>
        )}
        {this.isNextPage() && (
          <Link
            className="next-page"
            to={`/jobs?${this.constructNextPageLink()}`}
          >
            <button>Next</button>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state.search;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSearchQuery,
      setLoading,
      fetchCitiesByCountry,
      storeParams,
      storePage,
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
