import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './prompt.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import pears from '../images/pairOfPears.png'
import { Button, TYPES, SIZES } from '../common/button'

export const Prompt = ({ step, title, p1, p2, to, buttonText }) => {
  return (
    <div className={styles.container}>
      <OnboardingHeader step={step} />

      {/* <div className={styles.mainContentContainer}>
        <div>
          <Link to="/" className={styles.backButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <p>Back</p>
          </Link>
          <img src={pears} className={styles.pearImage} />
        </div>
        <div className={styles.textContainer}>
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
      </div> */}
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
