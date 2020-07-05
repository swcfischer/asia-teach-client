import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Popper from '../../../../Components/Popper';

import './ResultItem.scss';

const countries = {
  thailand: 'Thailand',
  'south-korea': 'South Korea',
  china: 'China',
  japan: 'Japan',
  taiwan: 'Taiwan',
  vietnam: 'Vietnam',
  indonesia: 'Indonesia',
};

export default function ResultItem(props) {
  const {
    thumbnail,
    uuid,
    ageGroup,
    country,
    city,
    companyName,
    publishedDate,
    duration,
    pay,
    classSize,
    startDate,
  } = props;
  return (
    <Link to={`/posting/${uuid}`} className="posting-link">
      <div className="result-item">
        <div className="name">{companyName}</div>
        <div className="flex-container">
          <div className="thumbnail-container-width">
            <div className="thumbnail-container">
              {/* Will want to add more permanent conditional logic */}
              <img
                src={
                  thumbnail && thumbnail.includes('https')
                    ? thumbnail
                    : `/assets/${thumbnail}`
                }
                alt="school thumbnail"
              />
            </div>
          </div>
          <div className="bottom-section">
            <Popper text="Location" popperClassName="text-popper">
              <div className="students">
                {city}, {countries[country]}
              </div>
            </Popper>
            <Popper text="Start date" popperClassName="text-popper">
              <div className="students">{startDate}</div>
            </Popper>
            <Popper text="Student age" popperClassName="text-popper">
              <div className="students">{ageGroup}</div>
            </Popper>
            <Popper text="Contract duration" popperClassName="text-popper">
              <div className="students">{duration}</div>
            </Popper>
            <Popper text="Salary" popperClassName="text-popper">
              <div className="students pay">{pay}</div>
            </Popper>
            <Popper text="Class size" popperClassName="text-popper">
              <div className="students class-size">{classSize}</div>
            </Popper>
          </div>
          <div className="date">{moment(publishedDate).fromNow()}</div>
        </div>
      </div>
    </Link>
  );
}
