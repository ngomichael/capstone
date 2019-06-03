import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import styles from './question-field-no-validation.module.css'

export const QuestionFieldNoValidation = ({
  supplementaryText,
  type,
  name,
}) => {
  return (
    <div>
      <p className={styles.supplementaryText}>{supplementaryText}</p>
      <Field name={name} type={type} className={styles.input} />
    </div>
  )
}

QuestionFieldNoValidation.propTypes = {
  supplementaryText: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
