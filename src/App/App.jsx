import React, { useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify';
import ReactLoading from 'react-loading';

import { fetchCurrentUser } from 'App/appReducer';

// Page and Component imports -- Lazy Loaded
import {
  Home,
  Search,
  Register,
  RegisterWithFreeJob,
  Login,
  Posting,
  PostResume,
  Account,
  JobRoutes,
  ForgotPassword,
  Confirmation,
  Nav,
  Footer,
  PurchaseForm,
  SubscriptionForm,
  ChangePassword,
  ResumeDetails,
  AboutUs,
  ContactUs,

  // ResumeSearch,
  ResumeCheck,
} from 'App/LazyLoader';

import 'App/App.scss';

const App = ({ fetchCurrentUser, currentUser, isLoading }) => {
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  return isLoading ? (
    <div className="initial-load">
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    </div>
  ) : (
    <Fragment>
      <Router>
        <Nav currentUser={currentUser} isLoading={isLoading} />
        {currentUser ? <LoggedInRoutes /> : <LoggedOutRoutes />}
        <Footer />
      </Router>
      <ToastContainer className="base-toast-container" autoClose={6000} />
    </Fragment>
  );
};

const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/jobs" component={Search} />
      <Route path="/posting/:uuid" component={Posting} />
      <Route path="/resume/:resumeUuid" component={ResumeDetails} />
      <Route path="/account" component={Account} />
      <Route path="/post-resume" component={PostResume} />
      <Route path="/post-job" component={JobRoutes} />
      <Route path="/resume-board" component={ResumeCheck} />
      <Route path="/purchase-form/:price" component={PurchaseForm} />
      <Route path="/subscription" component={SubscriptionForm} />
      <Route path="/change-password/:token" component={ChangePassword} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/jobs" component={Search} />
      <Route path="/login" component={Login} />
      <Route path="/special-register/:uuid" component={RegisterWithFreeJob} />
      <Route path="/register" component={Register} />
      <Route path="/posting/:uuid" component={Posting} />
      <Route path="/post-resume" component={PostResume} />
      <Route path="/post-job" component={JobRoutes} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/confirmation/:token" component={Confirmation} />
      <Route path="/change-password/:token" component={ChangePassword} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return state.app;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCurrentUser }, dispatch);

App.protoTypes = {
  currentUser: PropTypes.object,
  fetchCurrentUser: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
