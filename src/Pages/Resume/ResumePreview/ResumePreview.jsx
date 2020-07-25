import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ResumeItem from '../../ResumeSearch/Components/Results/ResumeItem';
import ResumeView from '../../ResumeDetails/ResumeView';

import { API_ROOT } from 'api-config';

import './ResumePreview.scss';
import { toast } from 'react-toastify';

const ResumePreview = () => {
  const { userUuid } = useParams();
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        API_ROOT + `/api/post-resume/preview/${userUuid}`
      );

      setResumeData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function postData() {
      // setLoading(true);
      const { data } = await axios.post(
        API_ROOT + `/api/post-resume/publish/${userUuid}`
      );
      // setLoading(false);

      if (data.error) {
        return toast.error(data.message);
      }
      return toast.success(data.message);
    }
    postData();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="resume-preview-container">
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
          <ResumeItem {...resumeData} lastUpdatedAt={new Date()} />
        </div>
        <div className="divider"></div>
        <div style={{ pointerEvents: 'none' }}>
          <ResumeView {...resumeData} />
        </div>
        <button type="submit" className="btn btn-blue publish-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

export default ResumePreview;
