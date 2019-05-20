import React from 'react'
import PropTypes from 'prop-types'
import styles from './onboarding-header.module.css'
import { OnboardingTracker } from './onboarding-tracker'
import PearCareIcon from '../icons/pearcare-icon.png'
import { Link } from '@reach/router'

export const OnboardingHeader = ({ step }) => {
  return (
    <header className={styles.container}>
      <Link to="/" className={styles.logoAndNameContainer}>
        <img src={PearCareIcon} className={styles.logo} />
        <p className={styles.productName}>PearCare</p>
      </Link>
      <div className={styles.onboardingTracker}>
        <OnboardingTracker step={step} />
      </div>
    </header>
  )
}

OnboardingHeader.propTypes = {
  step: PropTypes.number.isRequired,
}
