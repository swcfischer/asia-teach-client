import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import Subscription from './Subscription';

import JobItem from './JobItem';

import { fetchUnpublished, fetchPublished } from './reducer';

import './Account.scss';
import 'react-tabs/style/react-tabs.css';

const Dashboard = (props) => {
  const { fetchPublished, fetchUnpublished, currentUser, isLoading } = props;

  useEffect(() => {
    if (currentUser) {
      fetchPublished();
      fetchUnpublished();
    }
  }, [fetchPublished, fetchUnpublished, currentUser]);

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  }
  return (
    <div className="job-dashboard">
      <div className="header-container">
        {/* <h1 className="base-header-styling">Dashboard</h1> */}
        <Link to="/post-job/purchase-jobs" className="purchase-job-posting">
          <button className="btn btn-blue">Buy more jobs</button>
        </Link>
      </div>{' '}
      <Subscription currentUser={currentUser} />
      <h1 className="base-header-styling">Jobs</h1>
      <Tabs>
        <TabList>
          <Tab>Unpublished</Tab>
          <Tab>Published</Tab>
          <Tab>Expired</Tab>
        </TabList>
        <TabPanel>
          <div className="jobs-container base-container">
            {props.unpublishedJobs &&
              props.unpublishedJobs.map(({ uuid, companyName }, idx) => (
                <JobItem
                  uuid={uuid}
                  key={idx}
                  companyName={companyName}
                  idx={idx}
                />
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="jobs-container base-container">
            {props.publishedJobs &&
              props.publishedJobs.map((job, idx) => (
                <JobItem key={idx} idx={idx} uuid={job.uuid} {...job} />
              ))}
          </div>
        </TabPanel>
        <TabPanel>ExpiredJobs</TabPanel>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.jobs,
    currentUser: state.app.currentUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUnpublished, fetchPublished }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
