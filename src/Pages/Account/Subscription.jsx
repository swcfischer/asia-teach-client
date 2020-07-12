import React, { useEffect } from 'react';
import axios from 'axios';

import './Subscription.scss';

const Subscription = (props) => {
  useEffect(() => {
    async function fetchData() {
      // const result = await axios.get('/something something');
    }

    fetchData();
  }, []);

  return (
    <div className="base-container">
      <h3>Subscription Info</h3>
      <p>You subscription to the resume board is active</p>
    </div>
  );
};

export default Subscription;
