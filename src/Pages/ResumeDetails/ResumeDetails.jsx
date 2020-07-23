import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from 'api-config';

import Popper from 'Components/Popper';

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

  return (
    <div className="resume-view-container">
      <h1 className="base-header-styling">{details.name}</h1>
      <div className="base-container">
        <div className="upper-container">
          <div className="image-container">
            <img
              className="profile-image"
              src={details.profileImage}
              alt="profile"
            />
          </div>
          <ul className="resume-info-list">
            <li>
              <Popper popperClassName="resume-popper" text="Email">
                {details.email}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Nationality">
                {details.nationality}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Education">
                {details.education}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Experience">
                {details.experience} years
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Desired Country">
                {details.desiredCountry}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Desired Start Date">
                {details.desiredStartDate}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Desired Age Group">
                {details.desiredAgeGroup}
              </Popper>
            </li>
          </ul>
        </div>
        <div className="divider"></div>
        {details.resumeHtml ? (
          <div
            className="resume-html-wrapper"
            dangerouslySetInnerHTML={{ __html: details.resumeHtml }}
          ></div>
        ) : (
          <div className="resume-link-wrapper">
            <a href={details.resumeUrl} target="_blank">
              PDF URL
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDetails;
