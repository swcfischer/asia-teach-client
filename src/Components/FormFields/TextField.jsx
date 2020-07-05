import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function TextField(props) {
  return (
    <div className="text-field-container">
      <div className="inner-container">
        <label className="text-field-label" htmlFor={props.name}>
          {props.label}
          <div className="error-message">
            <ErrorMessage name={props.name} />
          </div>
        </label>
        <Field
          type={props.type || 'text'}
          name={props.name}
          className="text-field-input"
          placeholder={props.placeholder || ''}
        />
      </div>
    </div>
  );
}
