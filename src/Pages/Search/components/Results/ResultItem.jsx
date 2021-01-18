import React, { useCallback } from 'react';
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

export const startDateOptions = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

export const durationOptions = [
  { label: '1 Month', value: 1 },
  { label: '2 Months', value: 2 },
  { label: '3 Months', value: 3 },
  { label: '4 Months', value: 4 },
  { label: '5 Months', value: 5 },
  { label: '6 Months', value: 6 },
  { label: '7 Months', value: 7 },
  { label: '8 Months', value: 8 },
  { label: '9 Months', value: 9 },
  { label: '10 Months', value: 10 },
  { label: '11 Months', value: 11 },
  { label: '1 Year', value: 12 },
  { label: 'More than 1 year', value: 13 },
];

const mapCountryToStockPhoto = {
  thailand:
    'https://static-files-asia-teach.s3.amazonaws.com/example_images/thailand.png',
  china:
    'https://static-files-asia-teach.s3.amazonaws.com/example_images/china.png',
  vietnam:
    'https://static-files-asia-teach.s3.amazonaws.com/example_images/vietnam.png',
  indonesia:
    'https://static-files-asia-teach.s3.amazonaws.com/example_images/indonesia.png',
  'south-korea':
    'https://static-files-asia-teach.s3.amazonaws.com/example_images/korea.png',
  japan:
    'https://static-files-asia-teach.s3.amazonaws.com/example_images/japan.png',
  taiwan:
    'https://static-files-asia-teach.s3.amazonaws.com/example_images/taiwan.png',
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
  let labelDate = '';
  labelDate = startDateOptions.find((el) => el.value === startDate)?.label;
  let labelDuration = '';
  labelDuration = durationOptions.find((el) => el.value === duration)?.label;

  const handlePhoto = useCallback(() => {
    // For now, this will not handle the local static file
    if (!thumbnail) {
      return mapCountryToStockPhoto[country];
    } else {
      return thumbnail;
    }

    /* Previous logic
        thumbnail && thumbnail.includes('https')
          ? thumbnail
          : thumbnail
          ? `/assets/${thumbnail}`
          : 'https://static-files-asia-teach.s3.amazonaws.com/korea-bg-2.jpg'
    */
  }, [country, thumbnail]);

  return (
    <Link to={`/posting/${uuid}`} className="posting-link">
      <div className="result-item">
        <div className="name">{companyName}</div>
        <div className="flex-container">
          <div className="thumbnail-container-width">
            <div className="thumbnail-container">
              {/* Will want to add more permanent conditional logic */}
              <img src={handlePhoto()} loading="lazy" alt="school thumbnail" />
            </div>
          </div>
          <div className="bottom-section">
            <div className="bottom-divider">
              <Popper text="Location" popperClassName="text-popper">
                <div className="result-item-text first-result-item-text">
                  {city}, {countries[country]}
                </div>
              </Popper>
              <Popper text="Start date" popperClassName="text-popper">
                <div className="result-item-text">{labelDate || 'ASAP'}</div>
              </Popper>
              <Popper text="Student age" popperClassName="text-popper">
                <div className="result-item-text">{ageGroup}</div>
              </Popper>
            </div>
            <div className="bottom-divider">
              <Popper text="Contract duration" popperClassName="text-popper">
                <div className="result-item-text">{labelDuration}</div>
              </Popper>
              <Popper text="Salary" popperClassName="text-popper">
                <div className="result-item-text pay">{pay}</div>
              </Popper>
              <Popper text="Class size" popperClassName="text-popper">
                <div className="result-item-text class-size">{classSize}</div>
              </Popper>
            </div>
          </div>
          <div className="date">{moment(publishedDate).fromNow()}</div>
        </div>
      </div>
    </Link>
  );
}
