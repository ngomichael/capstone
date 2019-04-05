import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './prompt.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { Button, TYPES, SIZES } from '../common/button'
import { BackButton } from '../common/back-button'

export const Prompt = ({
  step,
  title,
  p1,
  p2,
  buttonText,
  image,
  nextPath,
  prevPath,
}) => {
  // useEffect(() => {

  // })

  return (
    <div className={styles.container}>
      <OnboardingHeader step={step} />
      <div className={styles.maxWidthContainer}>
        <div className={styles.mainContentContainer}>
          {image}
          <div className={styles.textContainer}>
            <BackButton path={prevPath} />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.p1}>{p1}</p>
            <p className={styles.p2}>{p2}</p>
            <Link to={nextPath}>
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
    </div>
  )
}

Prompt.propTypes = {
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  p1: PropTypes.string.isRequired,
  p2: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  img: PropTypes.node,
  nextPath: PropTypes.string.isRequired,
  prevPath: PropTypes.string.isRequired,
}
