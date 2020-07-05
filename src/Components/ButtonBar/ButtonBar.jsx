import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// ! I don't think this is in use

import 'Components/ButtonBar/ButtonBar.scss';

export const ButtonBar = (props) => {
  // handleSave
  // backLink
  // nextLink
  // isNextable
  return (
    <div className="btn-bar-container">
      <button className="save-btn btn-green btn">Save</button>
      <Link>
        <button className="back-btn btn-orange btn">Back</button>
      </Link>
      <Link>
        <button className="next-btn btn-blue btn">Next</button>
      </Link>
    </div>
  );
};
