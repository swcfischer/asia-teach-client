import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import ReactModal from 'react-modal';
import { IoIosImages } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
import axios from 'axios';
import { API_ROOT } from 'api-config';
import { toast } from 'react-toastify';

import ImageCarousel from './components/ImageCarousel';

import './Posting.scss';

import {
  clearData,
  fetchPosting,
  updateLikes,
  logClick,
  logTimeSpent,
} from './reducer';

// ! I thought I noticed a slight perf reductrion when I iterated to create image list versus non-list iterated img tags

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('body');

class Posting extends Component {
  constructor(props) {
    super(props);
    this.timeSpent = 0;
    this.timeSpentId = setInterval(() => {
      this.timeSpent++;
    }, 1000);
  }

  state = {
    isOpen: false,
  };
  componentDidMount() {
    this.props.logClick(this.props.match.params.uuid);
    this.props.fetchPosting(this.props.match.params.uuid);
    window.scrollTo({ top: 0 });
  }

  componentWillUnmount() {
    // log time tracking
    const { uuid } = this.props.match.params;
    this.props.logTimeSpent({ uuid, timeSpent: this.timeSpent });
    window.clearInterval(this.timeSpentId);

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
      favoritedBy,
      images,
      uuid: jobUuid,
    } = this.props.job;

    const { isLoading, userUuid } = this.props;

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
          <div className="back-btn-container">
            <button
              className="btn-blue btn go-back-btn"
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              Go back
            </button>
          </div>
          <div className="header">
            <div className="link-email-wrapper">
              <div className="email-wrapper">
                <a href={`mailto:${email}`}>{email}</a>
                <FiCopy onClick={this.copyToClipboard} className="email-copy" />
              </div>
              {link && (
                <div className="link-wrapper">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Application Link
                  </a>
                </div>
              )}
            </div>
            {images && images.length > 0 && (
              <div
                className="images-container"
                onClick={this.handleCarouselOpen}
              >
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
            )}
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: descriptionHTML }}
          ></div>
          <div className="save-btn-container">
            <button
              className="save-btn btn btn-green"
              onClick={async (event) => {
                event.preventDefault();

                if (!this.props.userUuid) {
                  return toast.error('Must be logged in to save');
                }
                // create api endpoint to like a job,
                // must send two uuids, job uuid and user uuid
                // axios blah blah
                const { data } = await axios.post(
                  `${API_ROOT}/api/favorites/${userUuid}/${jobUuid}`
                );

                if (data.error) {
                  toast.error(data.message);
                } else {
                  toast.success(data.message);
                }

                this.props.updateLikes(data.favoritedBy);
              }}
            >
              {favoritedBy.includes(userUuid) ? 'Unsave' : 'Save'}
            </button>
          </div>
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
  return {
    ...state.posting,
    userUuid: state.app.currentUser && state.app.currentUser.uuid,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { clearData, fetchPosting, updateLikes, logClick, logTimeSpent },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Posting)
);
