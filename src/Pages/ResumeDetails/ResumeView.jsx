import React, { useCallback } from 'react';
import Popper from 'Components/Popper';

import { FiCopy } from 'react-icons/fi';

import './ResumeDetails.scss';

function ResumeView(props) {
  const copyToClipboard = useCallback(() => {
    const str = props.email;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }, [props.email]);
  return (
    <div className="resume-view-container">
      <h1 className="base-header-styling">{props.name}</h1>
      <div className="base-container">
        <div className="upper-container">
          <div className="image-container">
            <img
              className="profile-image"
              src={props.profileImage}
              alt="profile"
            />
          </div>
          <ul className="resume-info-list">
            <li>
              <Popper popperClassName="resume-popper" text="Email">
                <div className="email-wrapper">
                  <a href={`mailto:${props.email}`}>{props.email}</a>
                  <FiCopy onClick={copyToClipboard} className="email-copy" />
                </div>
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Nationality">
                {props.nationality}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Education">
                {props.education}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Experience">
                {props.experience} years
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Desired Country">
                {props.desiredCountry}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Desired Start Date">
                {props.desiredStartDate}
              </Popper>
            </li>
            <li>
              <Popper popperClassName="resume-popper" text="Desired Age Group">
                {props.desiredAgeGroup}
              </Popper>
            </li>
          </ul>
        </div>
        <div className="divider"></div>
        {props.resumeHtml ? (
          <div
            className="resume-html-wrapper"
            dangerouslySetInnerHTML={{ __html: props.resumeHtml }}
          ></div>
        ) : (
          <div className="resume-link-wrapper">
            <a href={props.resumeUrl} target="_blank" rel="noopener noreferrer">
              PDF URL
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeView;
