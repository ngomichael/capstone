import React, { useState } from 'react'
import { Link, Redirect, navigate } from '@reach/router'
import firebase from '../firebase/firebase'
import styles from './sign-up.module.css'
import { ROUTES, ONBOARDING_ROUTES } from '../constants/routes'
import { Button, TYPES, SIZES } from '../common/button'
import { InputField } from '../common/input-field'
import { HomeHeader } from '../common/home-header'
import pears from '../images/pairOfPears.png'

export const ProviderSignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createdAccount, setCreatedAccount] = useState(false)
  const [signedInUser, setUser] = useState({})

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  async function handleSignUp() {
    return <Redirect noThrow to={ONBOARDING_ROUTES.providerQuestionnaire} />
  }

  return (
    <div className={styles.container}>
      <HomeHeader />
      <div className={styles.maxWidthContainer}>
        <div className={styles.imageSignUpContainer}>
          <div className={styles.pearImagesContainer}>
            <img src={pears} className={styles.pearImage} />
            <img src={pears} className={styles.pearImage} />
          </div>
          <div className={styles.signUpInfoContainer}>
            <p className={styles.title}>Welcome to PearCare</p>
            <p className={styles.description}>
              Creating an account is the first step to making a provider profile
              with PearCare. Get started now!
            </p>
            {/* <div className={styles.signIn}>
              <span>Already have an account? </span>{' '}
              <Link className={styles.link} to="/signin">
                Sign In
              </Link>
            </div> */}
            <form className={styles.form}>
              <div className={styles.inputContainer}>
                <InputField
                  value={name}
                  type="text"
                  onChange={handleNameChange}
                  label="Name"
                />

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
                onClick={() => {
                  navigate(ONBOARDING_ROUTES.providerQuestionnaire)
                }}
              >
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
