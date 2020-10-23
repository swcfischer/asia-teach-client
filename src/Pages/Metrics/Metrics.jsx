import React, { useEffect, useState, useCallback } from 'react';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { API_ROOT } from 'api-config';

import './Metrics.scss';

function Metrics() {
  const [isLoading, setLoading] = useState(true);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [numberOfSaves, setNumberOfSaves] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const { uuid } = useParams();

  useEffect(() => {
    async function fetchData() {
      // this is where I would use axios to fetch data

      const { data } = await axios.get(`${API_ROOT}/api/job/metrics/${uuid}`);

      setTimeSpent(data.timeSpent);
      setNumberOfClicks(data.numberOfClicks);
      setNumberOfSaves(data.favoritedBy);
      setLoading(false);
    }

    fetchData();
  }, [uuid]);

  const calculateAverageTime = useCallback(() => {
    if (numberOfClicks === 0) {
      return 0;
    }

    const averageTime = Math.round(timeSpent / numberOfClicks);
    return averageTime;
  }, [timeSpent, numberOfClicks]);

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  }
  return (
    <div className="metrics-container">
      <div className="base-header-styling">Metrics</div>
      <div className="base-container metrics-base-container">
        <dl className="metrics-list">
          <dt>Number of clicks</dt>
          <dd>{numberOfClicks} clicks</dd>
          <dt>Total time spent</dt>
          <dd>{timeSpent} seconds</dd>
          <dt>Average time spent</dt>
          <dd>{calculateAverageTime()} seconds</dd>
          <dt>Number of saves</dt>
          <dd>{numberOfSaves} saves</dd>
        </dl>
        {/* <p>Liked by: ...</p> */}
      </div>
    </div>
  );
}

export default Metrics;
