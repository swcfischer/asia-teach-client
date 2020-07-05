import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ResumeItem from '../../ResumeSearch/Components/Results/ResumeItem';
import { API_ROOT } from 'api-config';

import './ResumePreview.scss';

const ResumePreview = () => {
  const { userUuid } = useParams();
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { data } = axios.get(
      API_ROOT + `/api/post-resume/preview/${userUuid}`
    );

    setResumeData(data);
    setLoading(false);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="resume-preview-container">
      <ResumeItem {...resumeData} />
    </div>
  );
};

export default ResumePreview;
