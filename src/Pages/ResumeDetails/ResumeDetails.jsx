import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from 'api-config';

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
  }, []);

  console.log('details', details);

  return <div>ResumeDetails</div>;
};

export default ResumeDetails;
