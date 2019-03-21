import React from 'react'
import PropTypes from 'prop-types'
import styles from './onboarding-tracker.module.css'

export const OnboardingTracker = ({ step = 1 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <div className={styles.circleActive}>1</div>
        <p className={styles.stepName}>Tell us about you</p>
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
        <p className={styles.stepName}>View Providers</p>
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
        <p className={styles.stepName}>Connect with providers</p>
      </div>
    </div>
  )
}

OnboardingTracker.propTypes = {
  step: PropTypes.number,
}
