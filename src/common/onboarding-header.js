import React from 'react'
import PropTypes from 'prop-types'
import styles from './onboarding-header.module.css'
import { OnboardingTracker } from './onboarding-tracker'
import PearCareLogo from '../images/logo.png'

export const OnboardingHeader = ({ step }) => {
  return (
    <header className={styles.container}>
      <div className={styles.nameAndNavContainer}>
        <div className={styles.imageNameContainer}>
          <img src={PearCareLogo} className={styles.productImage} />
          <h1 className={styles.productName}>PearCare</h1>
        </div>
        <div className={styles.progressTracker}>
          <OnboardingTracker step={step} />
        </div>
      </div>
    </header>
  )
}

OnboardingHeader.propTypes = {
  step: PropTypes.number.isRequired,
}
