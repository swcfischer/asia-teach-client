import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import axios from 'axios';

import Subscription from './Subscription';

import JobItem from './JobItem';
import FavoriteItem from './FavoriteItem';

import { API_ROOT } from 'api-config';
import {
  fetchUnpublished,
  fetchPublished,
  fetchExpired,
  fetchFavoriteJobs,
  unsaveJob,
} from './reducer';

import './Account.scss';
import 'react-tabs/style/react-tabs.css';

const tabRouteMap = {
  unpublished: 0,
  published: 1,
  expired: 2,
};

const Dashboard = (props) => {
  const {
    fetchPublished,
    fetchUnpublished,
    fetchExpired,
    fetchFavoriteJobs,
    unsaveJob,
    currentUser,
    isLoading,
  } = props;
  const [isActive, setActive] = useState();
  const [isCancelAtEnd, setCancelAtEnd] = useState();
  const [isLoadingLocal, setLoadingLocal] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  const history = useHistory();
  const { params } = useRouteMatch();

  useEffect(() => {
    if (currentUser) {
      fetchPublished();
      fetchUnpublished();
      fetchExpired();
      fetchFavoriteJobs();
    }

    const { selectedTab } = params;

    const currentTabIndex =
      selectedTab && tabRouteMap[selectedTab] ? tabRouteMap[selectedTab] : 0;

    setTabIndex(currentTabIndex);

    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT +
          `/api/subscription/${currentUser.uuid}/${currentUser.subscriptionId}`
      );

      setActive(data.status);
      setCancelAtEnd(data.cancelAtPeriodEnd);

      // const result = await axios.get('/something something');
    }

    if (currentUser.subscriptionId) {
      fetchData();
    }
    setLoadingLocal(false);
  }, [
    fetchPublished,
    fetchUnpublished,
    currentUser,
    fetchExpired,
    fetchFavoriteJobs,
  ]);

  const handleSelect = useCallback(
    (index) => {
      const tabRoute = Object.keys(tabRouteMap).find(
        (key) => tabRouteMap[key] === index
      );

      history.push(`/account/${tabRoute}`);
      setTabIndex(index);
    },
    [tabIndex]
  );

  if (isLoading || isLoadingLocal) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  }

  return (
    <div className="job-dashboard">
      <div className="header-container">
        <Link to="/post-job/purchase-jobs" className="purchase-job-posting">
          <button className="btn btn-blue">Buy more jobs</button>
        </Link>
      </div>{' '}
      {isActive === 'active' && (
        <Subscription
          currentUser={currentUser}
          isActive={isActive}
          setCancelAtEnd={setCancelAtEnd}
          isCancelAtEnd={isCancelAtEnd}
        />
      )}
      <h1 className="base-header-styling">Jobs</h1>
      <Tabs selectedIndex={tabIndex} onSelect={handleSelect}>
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
                  isUnpublished={true}
                />
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="jobs-container base-container">
            {props.publishedJobs &&
              props.publishedJobs.map((job, idx) => (
                <JobItem
                  key={idx}
                  idx={idx}
                  uuid={job.uuid}
                  isUnpublished={false}
                  {...job}
                />
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="jobs-container base-container">
            {props.expiredJobs &&
              props.expiredJobs.map((job, idx) => (
                <JobItem
                  key={idx}
                  idx={idx}
                  uuid={job.uuid}
                  isUnpublished={false}
                  {...job}
                />
              ))}
          </div>
        </TabPanel>
      </Tabs>
      <h2 className="base-header-styling">Saved jobs</h2>
      <div className="saved-container">
        {props.favoriteJobs.map((job) => (
          <FavoriteItem {...job} key={job.uuid} unsaveJob={unsaveJob} />
        ))}
        {props.favoriteJobs.length === 0 && <p>You have no jobs saved</p>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.account,
    currentUser: state.app.currentUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUnpublished,
      fetchPublished,
      fetchExpired,
      fetchFavoriteJobs,
      unsaveJob,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
