import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import 'Components/Footer/Footer.scss';

const Footer = ({ currentUser }) => {
  const toTop = (e) => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="footer-container">
      <div className="inner-container">
        <div className="left-side">
          <div className="fan-logo">
            <img src="/assets/fan.png" alt="fan" />
          </div>
          <h2 className="site-title">Asia Teach</h2>
        </div>
        <ul className="link-container">
          <li className="link">
            <Link onClick={toTop} to="/contact-us">
              Contact Us
            </Link>
          </li>
          <li className="link">
            <Link onClick={toTop} to="/about-us">
              About Us
            </Link>
          </li>
          <li className="link">
            <Link onClick={toTop} to="/">
              Home
            </Link>
          </li>
          <li className="link">
            <Link onClick={toTop} to="/post-job/purchase-jobs">
              Purchase Job Credits
            </Link>
          </li>
          {currentUser ? (
            <Fragment>
              <li className="link">
                <Link onClick={toTop} to="/account">
                  Account
                </Link>
              </li>
              <li className="link">
                <Link
                  onClick={toTop}
                  to={`/post-resume/details/${currentUser.uuid}`}
                >
                  Post Resume
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li onClick={toTop} className="link">
                <Link to="/login">Login</Link>
              </li>
              <li onClick={toTop} className="link">
                <Link to="/register">Create Account</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
