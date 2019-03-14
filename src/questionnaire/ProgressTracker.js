import React from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressTracker.module.css'

const ProgressTracker = ({ step }) => {
  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <div className={styles.circleActive}>1</div>
        <p>Tell us about you</p>
      </div>
      <hr
        className={
          step >= 2 ? `${styles.line} ${styles.lineActive}` : styles.line
        }
      />
      <div className={styles.step}>
        <div
          className={
            step >= 2
              ? `${styles.circle} ${styles.circleActive}`
              : styles.circle
          }
        >
          2
        </div>
        <p>View Providers</p>
      </div>

      <hr
        className={
          step === 3 ? `${styles.line} ${styles.lineActive}` : styles.line
        }
      />
      <div className={styles.step}>
        <div
          className={
            step === 3
              ? `${styles.circle} ${styles.circleActive}`
              : styles.circle
          }
        >
          3
        </div>
        <p>Connect with providers</p>
      </div>
    </div>
  )
}

ProgressTracker.propTypes = {
  step: PropTypes.number,
}

export default ProgressTracker
