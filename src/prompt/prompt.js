import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './prompt.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { Button, TYPES, SIZES } from '../common/button'
import { BackButton } from '../common/back-button'

export const Prompt = ({ step, title, p1, p2, to, buttonText, image }) => {
  return (
    <div className={styles.container}>
      <OnboardingHeader step={step} />

      <div className={styles.mainContentContainer}>
        {image}
        <div className={styles.textContainer}>
          <BackButton />
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.p1}>{p1}</p>
          <p className={styles.p2}>{p2}</p>
          <Link to={to}>
            <Button
              type="button"
              buttonType={TYPES.PRIMARY}
              buttonSize={SIZES.MEDIUM}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

Prompt.propTypes = {
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  p1: PropTypes.string.isRequired,
  p2: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
}
