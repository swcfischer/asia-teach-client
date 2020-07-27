import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import ReactModal from 'react-modal';
import { IoIosImages } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';

import ImageCarousel from './components/ImageCarousel';

import './Posting.scss';

import { clearData, fetchPosting } from './reducer';

// ! I thought I noticed a slight perf reductrion when I iterated to create image list versus non-list iterated img tags

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('body');

class Posting extends Component {
  state = {
    isOpen: false,
  };
  componentDidMount() {
    this.props.fetchPosting(this.props.match.params.uuid);
    window.scrollTo({ top: 0 });
  }
  componentWillUnmount() {
    this.props.clearData();
  }

  handleCarouselOpen = () => {
    this.setState({ isOpen: true });
  };

  handleCarouselClose = () => {
    this.setState({ isOpen: false });
  };

  copyToClipboard = () => {
    const str = this.props.job.email;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  render() {
    // * the commented out data will show as a popper with a question mark icon
    const {
      // companyName,
      // city,
      // country,
      // ageGroup,
      // duration,
      // startDate,
      // classSize,
      // pay,
      descriptionHTML,
      thumbnail,
      link,
      email,
      isLoading,
    } = this.props.job;

    const { isOpen } = this.state;

    if (isLoading) {
      return (
        <div className="base-loading-container">
          <ReactLoading type="spin" color="#000" />
        </div>
      );
    }

    return (
      <div className="post-container">
        <div className="job-description">
          <div className="header">
            <div>
              <div className="email-wrapper">
                <a href={`mailto:${email}`}>{email}</a>
                <FiCopy onClick={this.copyToClipboard} className="email-copy" />
              </div>
              {link && (
                <div className="link-wrapper">
                  <a href={link} target="_blank">
                    Link
                  </a>
                </div>
              )}
              {/* <GoClippy /> */}
            </div>

            <div className="images-container" onClick={this.handleCarouselOpen}>
              <div className="gradient">
                <IoIosImages />
              </div>
              <img
                src={
                  thumbnail && thumbnail.includes('https')
                    ? thumbnail
                    : `/assets/${thumbnail}`
                }
                alt="stock school"
              />
            </div>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: descriptionHTML }}
          ></div>
        </div>

        <ReactModal
          isOpen={isOpen}
          contentLabel="Carousel Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <ImageCarousel handleClose={this.handleCarouselClose} />
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.posting;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clearData, fetchPosting }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Posting)
);
