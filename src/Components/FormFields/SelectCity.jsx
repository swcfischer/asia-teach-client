import React from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';

import myCities from 'Pages/Jobs/json/cities.json';

const sortCities = (a, b) => {
  if (a.label > b.label) {
    return 1;
  } else if (a.label < b.label) {
    return -1;
  }
  return 0;
};

for (const key in myCities) {
  const arrayOfCityObjs = myCities[key];
  arrayOfCityObjs.sort(sortCities);
  // this is mutating the array that the object points to
}

export default function SelectField({ label, name, value }) {
  const values = useFormikContext();
  return (
    <div className="select-field-container">
      <div className="inner-container">
        <label className="select-field-label" htmlFor={name}>
          {label}
          <div className="error-message">
            <ErrorMessage name={name} />
          </div>
        </label>
        <Field className="select-field" as="select" name={name}>
          <option value="" hidden></option>
          {values.values &&
            values.values.country &&
            myCities[values.values.country].map((el, idx) => (
              <option key={idx} value={el.value}>
                {el.label}
              </option>
            ))}
        </Field>
        <div className="triangle"></div>
      </div>
    </div>
  );
}
