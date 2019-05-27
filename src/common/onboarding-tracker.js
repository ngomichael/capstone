import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styles from './onboarding-tracker.module.css'
import classNames from 'classnames'

export const OnboardingTracker = ({ step = 1 }) => {
  const step1LineStyles = useSpring({
    width: step > 1 ? '100%' : '0%',
  })
  const step2LineStyles = useSpring({
    width: step > 2 ? '100%' : '0%',
  })

  const line1Class = classNames(styles.filledUpLine)

  const line2Class = classNames(styles.filledUpLine)

  const circle1Class = classNames(styles.circleActive, {
    [styles.circleCurrentStep]: step === 1,
  })

  const circle2Class = classNames(styles.circle, {
    [styles.circleActive]: step >= 2,
    [styles.circleCurrentStep]: step === 2,
  })

  const circle3Class = classNames(styles.circle, {
    [styles.circleActive]: step === 3,
    [styles.circleCurrentStep]: step === 3,
  })

  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <div className={circle1Class}>1</div>
        <p className={styles.stepName}>Tell us about you</p>
      </div>
      <div className={styles.linesContainer}>
        <animated.hr style={step1LineStyles} className={line1Class} />

        <hr className={styles.line} />
      </div>
      <div className={styles.step}>
        <div className={circle2Class}>2</div>
        <p className={styles.stepName}>View Providers</p>
      </div>

      <div className={styles.linesContainer}>
        <animated.hr style={step2LineStyles} className={line2Class} />
        <hr className={styles.line} />
      </div>
      <div className={styles.step}>
        <div className={circle3Class}>3</div>
        <p className={styles.stepName}>Connect with providers</p>
      </div>
    </div>
  )
}

OnboardingTracker.propTypes = {
  step: PropTypes.number,
}
