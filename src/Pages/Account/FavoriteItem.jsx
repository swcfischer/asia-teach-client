import React from 'react';
import { Link } from 'react-router-dom';

export default function JobItem(props) {
  const { companyName, city, uuid, country, unsaveJob } = props;

  return (
    <Link className="saved-item" to={`/posting/${uuid}`}>
      <div className="lefthand-wrapper">
        <div className="job-company-name">{companyName}</div>
        <div>
          <span className="capitalize">{country}</span>,{' '}
          <span className="capitalize">{city}</span>
        </div>
      </div>
      <div className="righthand-wrapper">
        <button
          className="btn btn-orange unsave-btn"
          onClick={(event) => {
            event.preventDefault();
            unsaveJob(uuid);
          }}
        >
          Unsave
        </button>
      </div>
    </Link>
  );
}

/*
POSSIBLE METRICS

  could be too taxing on server

  Time spent on ad,
  number of clicks
  email clicks
  site clicks
  visits per day -- possible bar graph


  

*/
