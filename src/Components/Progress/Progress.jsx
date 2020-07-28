import React, { Fragment, useEffect, useCallback } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';

import Popper from 'Components/Popper';

import 'Components/Progress/Progress.scss';

// * I want to create the array of all the types leading up to where I'm at, and then check the type for the link using array includes

export const Progress = ({ linkArray, baseLink, containerClassName = '' }) => {
  const lastItemIndex = linkArray.length - 1;
  const {
    params: { type, uuid },
  } = useRouteMatch();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [type]);

  const createArrayOfActiveTypes = useCallback(
    (type) => {
      const linkArrayStepperTypes = linkArray.map(
        (linkObj) => linkObj.stepperType
      );

      const idx = linkArrayStepperTypes.findIndex(
        (stepperType) => stepperType === type
      );
      // might want a sanity test here

      const arrayOfGoodValues = linkArrayStepperTypes.slice(0, idx + 1);
      return arrayOfGoodValues;
    },
    [linkArray]
  );

  const arrayOfActiveTypes = createArrayOfActiveTypes(type);

  return (
    <Fragment>
      <Title linkArray={linkArray} type={type} />
      {/* {linkArray.find((linkObj) => linkObj.stepperType === type).text} */}
      <div className={classNames('progress-container', containerClassName)}>
        {linkArray.map((linkObj, idx) => (
          <Fragment key={idx}>
            <LinkComponent
              {...linkObj}
              arrayOfActiveTypes={arrayOfActiveTypes}
              type={type}
              uuid={uuid}
              num={idx + 1}
              baseLink={baseLink}
            />

            {/* Prevent this lower element from showing on the last iteration */}
            {idx !== lastItemIndex && <div className="line"></div>}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

const LinkComponent = (props) => {
  const { num, uuid, baseLink, stepperType, arrayOfActiveTypes, text } = props; // text

  // will have to put in className boolean logic using useParams or useRouteMatch
  // will have to read docs
  // do a boolean check in type
  return (
    <Popper text={text}>
      <Link
        className={classNames({
          'disable-link': !arrayOfActiveTypes.includes(stepperType),
        })}
        to={`${baseLink}${stepperType}/${uuid}`}
      >
        <button
          className={classNames('step-btn', {
            selected: arrayOfActiveTypes.includes(stepperType),
          })}
        >
          {num}
        </button>
      </Link>
    </Popper>
  );
};

const Title = ({ linkArray, type }) => {
  const text = linkArray.find((linkObj) => linkObj.stepperType === type)?.text;
  if (!text) {
    return null;
  }

  return <h1 className="base-header-styling">{text}</h1>;
};
