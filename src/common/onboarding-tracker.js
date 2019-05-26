import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styles from './onboarding-tracker.module.css'

export const OnboardingTracker = ({ step = 1 }) => {
  const step1LineStyles = useSpring({ width: step > 1 ? '100%' : '0%' })

  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <div className={styles.circleActive}>1</div>
        <p className={styles.stepName}>Tell us about you</p>
      </div>
      <div className={styles.linesContainer}>
        <animated.hr
          style={step1LineStyles}
          className={
            step >= 2
              ? `${styles.filledUpLine} ${styles.filledUpLineActive}`
              : styles.filledUpLine
          }
        />

        <hr
          className={
            step >= 2 ? `${styles.line} ${styles.lineActive}` : styles.line
          }
        />
      </div>
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

      <div className={styles.linesContainer}>
        {/* <animated.hr
          styles={step2LineStyles}
          className={
            step >= 3
              ? `${styles.filledUpLine} ${styles.filledUpLineActive}`
              : styles.filledUpLine
          }
        /> */}
        <hr
          className={
            step === 3 ? `${styles.line} ${styles.lineActive}` : styles.line
          }
        />
      </div>
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
