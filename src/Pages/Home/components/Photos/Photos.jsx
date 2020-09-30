import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './Photos.scss';

const mockJson = [
  {
    name: 'China',
    info: 'The biggest, fastest-growing of all others.',
    className: 'china',
    link: 'china',
  },
  {
    name: 'Japan',
    info: 'Come visit the land of the rising sun.',
    className: 'japan',
    link: 'japan',
  },
  {
    name: 'South Korea',
    info: 'This country means business.',
    className: 'south-korea',
    link: 'south-korea',
  },
  {
    name: 'Thailand',
    info: 'A tourist destination with a relaxed vibe.',
    className: 'thailand',
    link: 'thailand',
  },
  {
    name: 'Taiwan',
    info: 'A small island with a lot to offer!',
    className: 'taiwan',
    link: 'taiwan',
  },
  {
    name: 'Vietnam',
    info: 'A good place to find fun and freedom.',
    className: 'vietnam',
    link: 'vietnam',
  },
  {
    name: 'Indonesia',
    info: 'Beautiful beaches await!',
    className: 'indonesia',
    link: 'indonesia',
  },
];

const PhotoLinks = (props) => {
  return (
    <div className="photo-links-parent-grid">
      {mockJson &&
        mockJson.length > 0 &&
        mockJson.map((el, idx) => (
          <Link
            to={`/jobs?country=${el.link}&page=1`}
            className={classNames('flex-styling', el.className)}
            key={`countries-${idx}`}
          >
            <div className={classNames('flex-styling', el.className)}>
              <div
                className={classNames('image-background', el.className)}
              ></div>
              <div className="image-content">
                <div className="image-header">{el.name}</div>
                <div className="image-info">{el.info}</div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PhotoLinks;
