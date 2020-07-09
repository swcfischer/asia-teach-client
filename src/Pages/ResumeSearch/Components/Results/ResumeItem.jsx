import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Popper from '../../../../Components/Popper';

import './ResumeItem.scss';

const countries = {
  thailand: 'Thailand',
  'south-korea': 'South Korea',
  china: 'China',
  japan: 'Japan',
  taiwan: 'Taiwan',
  vietnam: 'Vietnam',
  indonesia: 'Indonesia',
};

export default function ResumeItem(props) {
  const {
    nationality,
    education,
    experience,
    name,
    profileImage,
    lastUpdatedAt,
    uuid,
    desiredCountry,
    desiredStartDate,
    desiredAgeGroup,
  } = props;
  return (
    <Link to={`/resume/${uuid}`} className="resume-link">
      <div className="result-item">
        <div className="name">{name}</div>
        <div className="flex-container">
          <div className="thumbnail-container-width">
            <div className="thumbnail-container">
              {/* Will want to add more permanent conditional logic */}
              <img src={profileImage} alt="avatar" />
            </div>
          </div>
          <div className="bottom-section">
            <Popper text="Nationality" popperClassName="text-popper">
              <div className="students">{nationality}</div>
            </Popper>
            <Popper text="Experience" popperClassName="text-popper">
              <div className="students">{experience} years of experience</div>
            </Popper>
            <Popper text="Education" popperClassName="text-popper">
              <div className="students">{education}</div>
            </Popper>
            <Popper text="Desired country" popperClassName="text-popper">
              <div className="students">{desiredCountry || 'Japan'}</div>
            </Popper>
            <Popper text="Desired start date" popperClassName="text-popper">
              <div className="students">{desiredStartDate || 'March'}</div>
            </Popper>
            <Popper text="Desired age group" popperClassName="text-popper">
              <div className="students">{desiredAgeGroup || 'College'}</div>
            </Popper>
          </div>
          <div className="date">{moment(lastUpdatedAt).fromNow()}</div>
        </div>
      </div>
    </Link>
  );
}
