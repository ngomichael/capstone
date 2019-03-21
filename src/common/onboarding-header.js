import React from 'react'
import PropTypes from 'prop-types'
import styles from './onboarding-header.module.css'
import { OnboardingTracker } from './onboarding-tracker'
import PearCareLogo from '../images/logo.png'

export const OnboardingHeader = ({ step }) => {
  return (
    <header className={styles.container}>
      <div className={styles.logoAndNameContainer}>
        <img src={PearCareLogo} className={styles.logo} />
        <p className={styles.productName}>PearCare</p>
      </div>
      <div className={styles.progressTracker}>
        <OnboardingTracker step={step} />
      </div>
    </header>
  )
}

OnboardingHeader.propTypes = {
  step: PropTypes.number.isRequired,
}
