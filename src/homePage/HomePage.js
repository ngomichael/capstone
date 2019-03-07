import React from 'react'
// import { Link } from '@reach/router'
import styles from './HomePage.module.css'
import Header from './Header'

const HomePage = props => {
  return (
    <div className={styles.container}>
      <Header />
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
      </div>
      {/* <Link>Learn more about how it works</Link> */}
      {/* This button should be inside of a Link tag */}
      <button className={styles.findProviderButton}>Find a provider</button>
    </div>
  )
}

export default HomePage
