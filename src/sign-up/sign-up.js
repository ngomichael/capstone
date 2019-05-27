import React, { useState } from 'react'
import { Link, Redirect } from '@reach/router'
import firebase from '../firebase/firebase'
import styles from './sign-up.module.css'
import { Button, TYPES, SIZES } from '../common/button'
import { InputField } from '../common/input-field'
import { HomeHeader } from '../common/home-header'
import { UndrawLogin } from 'react-undraw'
import pears from '../images/pairOfPears.png'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createdAccount, setCreatedAccount] = useState(false)

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
    try {
      await firebase.register(name, email, password)
      await firebase.addUserInformation(name, password, email)
      setCreatedAccount(true)
      return <Redirect noThrow to="/getStarted" />
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <HomeHeader />
      <div className={styles.maxWidthContainer}>
        <div className={styles.imageSignUpContainer}>
          {/* <UndrawLogin
            primaryColor="#19ad9e"
            style={{ height: '325px', width: '22%' }}
          /> */}
          <div className={styles.pearImagesContainer}>
            <img src={pears} className={styles.pearImage} />
            <img src={pears} className={styles.pearImage} />
          </div>
          <div className={styles.signUpInfoContainer}>
            <p className={styles.title}>Create your PearCare Account</p>
            <p className={styles.description}>
              Before you start searching, please create an account! It only
              takes a few seconds and will help us save your information for
              next time!
            </p>
            <div className={styles.signIn}>
              <span>Already have an account? </span>{' '}
              <Link className={styles.link} to="/signin">
                Sign In
              </Link>
            </div>
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
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </form>
            {createdAccount ? <Redirect noThrow to="/getStarted" /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
