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
  } = props;
  return (
    <Link to={`/resume/${123}`} className="resume-link">
      <div className="result-item">
        <div className="name">{name}</div>
        <div className="flex-container">
          <div className="thumbnail-container-width">
            <div className="thumbnail-container">
              {/* Will want to add more permanent conditional logic */}
              <img src={`/assets/profile_photo.jpg`} alt="avatar" />
              {/* profileImage && profileImage.includes('https')
                  ? profileImage */}
            </div>
          </div>
          <div className="bottom-section">
            <Popper text="Nationality" popperClassName="text-popper">
              <div className="students">{nationality}</div>
            </Popper>
            <Popper text="Experience" popperClassName="text-popper">
              <div className="students">{experience}</div>
            </Popper>
            <Popper text="Start date" popperClassName="text-popper">
              <div className="students">March</div>
            </Popper>
            <Popper text="Contract duration" popperClassName="text-popper">
              <div className="students">12 months</div>
            </Popper>
            <Popper text="Salary" popperClassName="text-popper">
              <div className="students pay">10,000 reminbi</div>
            </Popper>
            <Popper text="Class size" popperClassName="text-popper">
              <div className="students class-size">30 students</div>
            </Popper>
          </div>
          <div className="date">{moment(lastUpdatedAt).fromNow()}</div>
        </div>
      </div>
    </Link>
  );
}
