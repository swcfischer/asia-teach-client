import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function SelectField({ label, name, options, placeholder }) {
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
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options &&
            options.length > 0 &&
            options.map((el, idx) => (
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
