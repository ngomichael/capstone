import React from 'react'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'

import styles from './QuestionField.module.css'

const QuestionField = ({
  question,
  supplementaryText,
  type,
  name,
  isLongInput,
  questionNumber,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.questionNumber}>
        {questionNumber}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </p>

      <div>
        <p className={styles.question}>{question}</p>
        <div>
          <p className={styles.supplementaryText}>{supplementaryText}</p>
          <Field
            name={name}
            type={type}
            className={isLongInput ? styles.longInput : styles.input}
          />
        </div>
        {/* <div>
          <div className={styles.careTypeContainer}>
            <p className={styles.careTypeName}>Therapy</p>
            <p className={styles.careTypeDescription}>
              A description about what therapy is and whatever we decide to put
              in here.
            </p>
          </div>

          <div className={styles.careTypeContainer}>
            <p className={styles.careTypeName}>Therapy</p>
            <p className={styles.careTypeDescription}>
              A description about what therapy is and whatever we decide to put
              in here.
            </p>
          </div>
          <div className={styles.careTypeContainer}>
            <p className={styles.careTypeName}>Therapy</p>
            <p className={styles.careTypeDescription}>
              A description about what therapy is and whatever we decide to put
              in here.
            </p>
          </div>
          <div className={styles.careTypeContainer}>
            <p className={styles.careTypeName}>Therapy</p>
            <p className={styles.careTypeDescription}>
              A description about what therapy is and whatever we decide to put
              in here.
            </p>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

QuestionField.propTypes = {
  question: PropTypes.string,
  supplementaryText: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  isLongInput: PropTypes.bool,
  questionNumber: PropTypes.number,
}

export default QuestionField
