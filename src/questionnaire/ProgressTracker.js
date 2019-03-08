import React from 'react'
import styles from './ProgressTracker.module.css'

const ProgressTracker = props => {
  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <div className={styles.circle}>1</div>
        <p>Create an account</p>
      </div>
      <hr className={styles.line} />
      <div className={styles.step}>
        <div className={styles.circle}>2</div>
        <p>Tell us about you</p>
      </div>

      <hr className={styles.line} />
      <div className={styles.step}>
        <div className={styles.circle}>3</div>
        <p>View providers</p>
      </div>
    </div>
  )
}

export default ProgressTracker
