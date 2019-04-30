import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'

import styles from './question-field.module.css'

export const QuestionField = ({ supplementaryText, type, name }) => {
  return (
    <div>
      <p className={styles.supplementaryText}>{supplementaryText}</p>
      <Field name={name} type={type} className={styles.input} />
    </div>
  )
}

QuestionField.propTypes = {
  supplementaryText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
