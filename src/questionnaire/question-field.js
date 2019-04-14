import React from 'react'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'

import styles from './question-field.module.css'

export const QuestionField = ({
  supplementaryText,
  type,
  name,
  isLongInput,
}) => {
  return (
    <div>
      <p className={styles.supplementaryText}>{supplementaryText}</p>
      <Field
        name={name}
        type={type}
        className={isLongInput ? styles.longInput : styles.input}
      />
    </div>
  )
}

QuestionField.propTypes = {
  supplementaryText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isLongInput: PropTypes.bool.isRequired,
}
