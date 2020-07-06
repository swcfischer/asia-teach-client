import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';

import ResumeSearch from './ResumeSearch.jsx';

import { API_ROOT } from 'api-config';

const ResumeCheck = ({ currentUser }) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post(API_ROOT + `/api/check-sub`, {
        subscriptionId: currentUser.subscriptionId,
      });
      setData(data);
      setLoading(false);
    }

    fetchData();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  } else {
    if (data.status !== 'active') {
      return <Redirect to="/subscription" />;
    }
    return <ResumeSearch />;
  }
};
const mapStateToProps = (state) => ({
  currentUser: state.app.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResumeCheck);
