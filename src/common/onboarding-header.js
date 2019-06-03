import React from 'react'
import PropTypes from 'prop-types'
import styles from './onboarding-header.module.css'
import { OnboardingTracker } from './onboarding-tracker'
import PearCareIcon from '../icons/pearcare-icon.png'
import { Link } from '@reach/router'
import { match } from '@reach/router/lib/utils'
import { UserProvider, UserConsumer } from '../context/user-context'

export const OnboardingHeader = ({ location }) => {
  let step = 0
  const isGetStarted = match('/onboardingTracker/getStarted', location.pathname)
  const isQuestionnaire = match(
    '/onboardingTracker/questionnaire',
    location.pathname
  )
  const isQuestionnaireCompleted = match(
    '/onboardingTracker/questionnaireCompleted',
    location.pathname
  )
  const isResults = match('/onboardingTracker/results', location.pathname)
  const isProviderInfo = match(
    '/onboardingTracker/results/*',
    location.pathname
  )

  if (isGetStarted || isQuestionnaire || isQuestionnaireCompleted) {
    step = 1
  } else if (isResults) {
    step = 2
  } else if (isProviderInfo) {
    step = 3
  }

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
  // step: PropTypes.number.isRequired,
}
