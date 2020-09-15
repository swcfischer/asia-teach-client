import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { API_ROOT } from 'api-config';

import ResumeView from './ResumeView';

const ResumeDetails = () => {
  const { resumeUuid } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      //resumeId
      const { data } = await axios.get(
        API_ROOT + `/api/resume-details/${resumeUuid}`
      );
      setLoading(false);
      setDetails(data);
    }

    fetchData();
    window.scrollTo({ top: 0 });
  }, [resumeUuid]);

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  }

  return <ResumeView {...details} />;
};

export default ResumeDetails;
