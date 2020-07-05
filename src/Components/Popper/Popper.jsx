import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import './Popper.scss';

export const Popper = ({ children, text, popperClassName = '' }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHover(true), [setIsHover]);
  const handleMouseLeave = useCallback(() => setIsHover(false), [setIsHover]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="popper-container"
    >
      {children}
      <div
        className={classNames('popper', popperClassName, {
          'show-popper': isHover,
        })}
      >
        {text}
      </div>
    </div>
  );
};
