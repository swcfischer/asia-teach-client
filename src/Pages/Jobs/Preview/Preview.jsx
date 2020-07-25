import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ROOT } from 'api-config';
import ReactLoading from 'react-loading';

import ResultItem from 'Pages/Search/components/Results/ResultItem';
import Posting from 'Pages/Posting/Posting';

import './Preview.scss';

const Preview = (props) => {
  const { userUuid } = props;
  const { uuid } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT + `/api/job/preview/${uuid}/${userUuid}`
      );
      console.log('data', data);
      setPreviewData(data);
      setIsLoading(false);
    }

    fetchData();
  }, [userUuid, uuid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function postData() {
      const { data } = await axios.post(
        API_ROOT + `/api/job/publish/${uuid}/${userUuid}`
      );

      if (data.error) {
        return toast.error(data.message);
      } else {
        return toast.success(data.message);
      }
    }

    postData();
  };

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading type="spin" color="#333" />
      </div>
    );
  }
  return (
    <div className="preview-container">
      <ul className="base-info-list">
        <li>
          You are looking at your tile, which appears in the search and
          underneath that is your page
        </li>
        <li>The publish button is at the bottom</li>
        <li>Click the circles above to return to previous step</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <div style={{ pointerEvents: 'none' }}>
          <ResultItem {...previewData} />
        </div>
        <div className="divider"></div>

        <Posting job={{ ...previewData }} />
        <button type="submit" className="btn btn-blue publish-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userUuid: state.app.currentUser.uuid,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
