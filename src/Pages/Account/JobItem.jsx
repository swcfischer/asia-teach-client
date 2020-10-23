import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { GoGraph } from 'react-icons/go';
import Popper from 'Components/Popper';

export default function JobItem(props) {
  const { idx, uuid, companyName, isUnpublished } = props;
  const history = useHistory();

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      let nodeClassName = event.target.className;
      if (typeof nodeClassName === 'object') {
        nodeClassName = 'metrics-icon';
      }
      if (!isUnpublished && nodeClassName.match(/metrics-icon/)) {
        history.push(`/job/metrics/${uuid}`);
      } else {
        history.push(`/post-job/stepper/details/${uuid}`);
      }
    },
    [isUnpublished, uuid, history]
  );

  return (
    <div onClick={handleClick} key={idx} className="job-item">
      <div className="job-company-name">
        {companyName ? companyName : 'Click this text to post job'}
      </div>
      <Metric isUnpublished={isUnpublished} uuid={uuid} />
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
  return <GoGraph className="metrics-icon" />;
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
