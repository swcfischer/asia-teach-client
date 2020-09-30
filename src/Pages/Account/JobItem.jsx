import React from 'react';
import { Link } from 'react-router-dom';

export default function JobItem(props) {
  const { idx, uuid, companyName } = props;
  return (
    <Link
      className="job-item"
      key={idx}
      to={`/post-job/stepper/details/${uuid}`}
    >
      <div className="job-company-name">
        {companyName ? companyName : 'Click here to post job'}
      </div>
      {/* <div>Job Id: {uuid}</div> */}
    </Link>
  );
}
