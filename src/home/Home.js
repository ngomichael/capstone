import React from 'react'
// import { Link } from '@reach/router'
import styles from './Home.module.css'
import SignedOutHeader from './SignedOutHeader'
import pears from '../images/pairOfPears.png'

const Home = props => {
  return (
    <div className={styles.container}>
      <SignedOutHeader />
      <div className={styles.introContainer}>
        <h1 className={styles.tagline}>
          Better patient-provider pairs, better mental healthcare
        </h1>
        <p className={styles.supplementaryText}>
          Searching for mental health services and finding a provider that fits
          any given patient’s needs can be an overwhelming and time-consuming
          process. PearCare's matching algorithm intends to personalize every
          individual’s experience when searching for a provider.
        </p>
        <button className={styles.findProviderButton}>Find a provider</button>
      </div>
      {/* <Link>Learn more about how it works</Link> */}
      {/* This button should be inside of a Link tag */}
      <div className={styles.pearImagesContainer}>
        <img
          src={pears}
          className={`${styles.pearImage} ${styles.pearImageOne}`}
        />
        <img src={pears} className={styles.pearImage} />
        <img
          src={pears}
          className={`${styles.pearImage} ${styles.pearImageThree}`}
        />
      </div>
    </div>
  )
}

export default Home
