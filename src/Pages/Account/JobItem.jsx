import React from 'react';
import { Link } from 'react-router-dom';
import { GoGraph } from 'react-icons/go';
import Popper from 'Components/Popper';

export default function JobItem(props) {
  const { idx, uuid, companyName, isUnpublished } = props;
  return (
    <div className="job-item">
      <Link key={idx} to={`/post-job/stepper/details/${uuid}`}>
        <div className="job-company-name">
          {companyName ? companyName : 'Click this text to post job'}
        </div>
      </Link>
      {/* <Metric isUnpublished={isUnpublished} uuid={uuid} /> */}
      {/* <div>Job Id: {uuid}</div> */}
    </div>
  );
}

function Metric({ isUnpublished, uuid }) {
  if (isUnpublished) {
    return (
      <Popper text="You must publish the job first">
        <GoGraph className="metrics-icon" />
      </Popper>
    );
  }
  return (
    <Link className="metrics-link" to={`/job/metrics/${uuid}`}>
      <GoGraph />
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
