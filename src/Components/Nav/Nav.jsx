import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUser,
  FaGlobeAsia,
} from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { MdViewList } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { eraseCurrentUser } from 'App/appReducer';
import { bindActionCreators } from 'redux';

import './Nav.scss';

class Nav extends Component {
  handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    this.props.eraseCurrentUser();
  };

  render() {
    const { isLoading, currentUser } = this.props;
    return (
      <div className="nav">
        <div className="nav-width-container">
          <Link to="/">
            <div className="header-container">
              <div className="logo"></div>
              <h1 className="logo-text">Asia Teach</h1>
            </div>
          </Link>
          {!isLoading && (
            <>
              {currentUser ? (
                <LoggedInMenu
                  userUuid={currentUser.uuid}
                  handleLogout={this.handleLogout}
                />
              ) : (
                <LoggedOutMenu />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const LoggedInMenu = (props) => {
  const { userUuid } = props;
  return (
    <div className="nav-items-container">
      <NavLink exact className="nav-item" activeClassName="selected" to="/">
        <FaGlobeAsia />
        <span className="text">Countries</span>
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to={`/post-resume/details/${userUuid}`}
        isActive={(match, location) => {
          const { pathname } = location;
          if (pathname.match(/post-resume/)) {
            return true;
          }

          return match;
        }}
      >
        <IoIosDocument />
        <span className="text">Post Resume</span>
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to="/resume-board?page=1"
      >
        <MdViewList />
        <span className="text">Resume Board</span>
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to="/post-job/purchase-jobs"
      >
        <GiTeacher />
        <span className="text">Post Job</span>
      </NavLink>
      <NavLink className="nav-item" activeClassName="selected" to="/account">
        <FaUser />
        <span className="text">Account</span>
      </NavLink>
      <div className="nav-item" tabIndex="0" onClick={props.handleLogout}>
        <FaSignOutAlt />
        <span className="text"> Logout</span>
      </div>
    </div>
  );
};

const LoggedOutMenu = () => {
  return (
    <div className="nav-items-container">
      <NavLink exact className="nav-item" activeClassName="selected" to="/">
        <FaGlobeAsia />
        <span className="text">Countries</span>
      </NavLink>
      <NavLink
        className="nav-item"
        isActive={() => false}
        activeClassName="selected"
        to="/register"
      >
        <IoIosDocument />
        <span className="text">Post Resume</span>
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to="/post-job/purchase-jobs"
      >
        <GiTeacher />
        <span className="text">Post Job</span>
      </NavLink>
      <NavLink className="nav-item" activeClassName="selected" to="/login">
        <FaSignInAlt />
        <span className="text">Login</span>
      </NavLink>
      <NavLink className="nav-item" activeClassName="selected" to="/register">
        <FaUserPlus />
        <span className="text">Register</span>
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ eraseCurrentUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
