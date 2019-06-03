import React, { useState } from 'react'
import { Link, Redirect } from '@reach/router'
import firebase from '../firebase/firebase'
import styles from './sign-in.module.css'
import { Button, TYPES, SIZES } from '../common/button'
import { ROUTES, ONBOARDING_ROUTES } from '../constants/routes'
import { InputField } from '../common/input-field'
import { HomeHeader } from '../common/home-header'
import pears from '../images/pairOfPears.png'
import { UserConsumer } from '../context/user-context'

export const SignIn = ({ location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  async function handleSignIn() {
    try {
      await firebase.signIn(email, password)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <UserConsumer>
      {context => (
        console.log(context),
        context.isLoading === false && context.userId.length !== 0 ? (
          context.userInfo.questionnaire_finished ? (
            <Redirect to={ROUTES.dashboard} noThrow />
          ) : (
            <Redirect to={ONBOARDING_ROUTES.getStarted} noThrow />
          )
        ) : (
          <div className={styles.container}>
            <HomeHeader />
            <div className={styles.maxWidthContainer}>
              <div className={styles.imageSignInContainer}>
                <div className={styles.pearImagesContainer}>
                  <img src={pears} className={styles.pearImage} />
                  <img src={pears} className={styles.pearImage} />
                </div>
                <div className={styles.signInInfoContainer}>
                  <p className={styles.title}>Welcome back</p>
                  <p className={styles.description}>
                    Catasstrophe headbutt owner's knee, so meow to be let out
                    for at four in the morning wake up owner meeeeeeooww scratch
                    at legs
                  </p>
                  <div className={styles.signUp}>
                    <span>Don't have an account? </span>{' '}
                    <Link className={styles.link} to={ROUTES.signUp}>
                      Sign Up
                    </Link>
                  </div>
                  <form className={styles.form}>
                    <div className={styles.inputContainer}>
                      <InputField
                        value={email}
                        type="text"
                        onChange={handleEmailChange}
                        label="Email"
                      />

                      <InputField
                        value={password}
                        type="password"
                        onChange={handlePasswordChange}
                        label="Password"
                      />
                    </div>

                    <Button
                      type="button"
                      buttonType={TYPES.PRIMARY}
                      buttonSize={SIZES.SMALL}
                      onClick={handleSignIn}
                    >
                      Sign In
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </UserConsumer>
  )
}
