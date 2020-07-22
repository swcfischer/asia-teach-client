import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from 'api-config';

import './ResumeDetails.scss';

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

  return (
    <div className="resume-view-container">
      <h1 className="base-header-styling">{details.name}</h1>
      <div className="base-container">
        <div className="upper-container">
          <div>
            <div>
              <strong>Email:</strong> {details.email}
            </div>
            <div>
              <strong>Nationality:</strong> {details.nationality}
            </div>
            <div>
              <strong>Education:</strong> {details.education}
            </div>
            <div>
              <strong>Experience:</strong> {details.experience} years
            </div>
            <div>
              <strong>Desired Country:</strong> {details.desiredCountry}
            </div>
            <div>
              <strong>Desired Start Date:</strong> {details.desiredStartDate}
            </div>
            <div>
              <strong>Desired Age Group:</strong> {details.desiredAgeGroup}
            </div>
          </div>
          <div className="image-container">
            <img
              className="profile-image"
              src={details.profileImage}
              alt="profile"
            />
          </div>
        </div>

        <p>{JSON.stringify(details, null, 4)}</p>
      </div>
    </div>
  );
};

export default ResumeDetails;
