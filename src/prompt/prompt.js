import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from '@reach/router'
import styles from './prompt.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { Button, TYPES, SIZES } from '../common/button'
import { BackButton } from '../common/back-button'
import firebase from '../firebase/firebase'
import { UserConsumer } from '../context/user-context'

export const Prompt = ({
  step,
  title,
  p1,
  p2,
  buttonText,
  image,
  nextPath,
  prevPath,
  skipText,
  skipText2,
  skipTextPath,
}) => {
  const [isSignedOut, setIsSignedOut] = useState(false)
  async function handleSignOut() {
    try {
      await firebase.signOut()
      setIsSignedOut(true)
      return <Redirect noThrow to="/" />
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <UserConsumer>
      {context => (
        console.log(context),
        (
          <div className={styles.container}>
            <div className={styles.maxWidthContainer}>
              <div className={styles.mainContentContainer}>
                {image}
                <div className={styles.textContainer}>
                  <BackButton path={prevPath} />
                  <h1 className={styles.title}>{title}</h1>
                  <p className={styles.p1}>{p1}</p>
                  <p className={styles.p2}>{p2}</p>
                  <div>
                    <Link to={`${nextPath}`}>
                      <Button
                        type="button"
                        buttonType={TYPES.PRIMARY}
                        buttonSize={SIZES.MEDIUM}
                      >
                        {buttonText}
                      </Button>
                    </Link>
                    <div className={styles.skipTextContainer}>
                      <span>{skipText}</span>{' '}
                      <Link
                        to={`${skipTextPath}`}
                        className={styles.skipTextPath}
                      >
                        {skipText2}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {isSignedOut ? <Redirect noThrow to="/" /> : null}
            </div>
          </div>
        )
      )}
    </UserConsumer>
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
