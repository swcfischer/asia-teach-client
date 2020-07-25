import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from 'api-config';

import ResumeView from './ResumeView';

const ResumeDetails = () => {
  const { resumeUuid } = useParams();
  const [details, setDetails] = useState({});
  useEffect(() => {
    async function fetchData() {
      //resumeId
      const { data } = await axios.get(
        API_ROOT + `/api/resume-details/${resumeUuid}`
      );

      setDetails(data);
    }

    fetchData();
    window.scrollTo({ top: 0 });
  }, []);

  return <ResumeView {...details} />;
};

export default ResumeDetails;
