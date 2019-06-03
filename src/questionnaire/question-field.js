import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import styles from './question-field.module.css'

const validate = value => {
  let errorMessage
  if (value.length === 0) {
    errorMessage = 'Field is required'
  } else if (value.length < 5) {
    errorMessage = 'Please enter a valid input'
  }
  return errorMessage
}

export const QuestionField = ({
  supplementaryText,
  type,
  name,
  touched,
  errors,
}) => {
  return (
    <div>
      <p className={styles.supplementaryText}>{supplementaryText}</p>
      <Field
        validate={validate}
        name={name}
        type={type}
        className={styles.input}
      />
      {errors[name] && touched[name] ? (
        <div className={styles.errorMessage}>{errors[name]}</div>
      ) : null}
    </div>
  )
}

QuestionField.propTypes = {
  supplementaryText: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
