import React from 'react';

import ResultItem from './ResultItem';

import './Results.scss';

const Results = props => {
  if (props.results && props.results.length > 0) {
    return (
      <div className="results-container">
        {props.results.map(result => (
          <ResultItem key={result.uuid} {...result} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="results-container">
        <div className="no-results">
          Sorry, there are no results for this criteria.
        </div>
      </div>
    );
  }
};

export default Results;
