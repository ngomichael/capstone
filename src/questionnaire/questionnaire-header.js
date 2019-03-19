import React from 'react'
import styles from './questionnaire-header.module.css'
import ProgressTracker from './progress-tracker'
import PearCareLogo from '../images/logo.png'

const QuestionnaireHeader = ({ step }) => {
  return (
    <header className={styles.container}>
      <div className={styles.nameAndNavContainer}>
        <div className={styles.imageNameContainer}>
          <img src={PearCareLogo} className={styles.productImage} />
          <h1 className={styles.productName}>PearCare</h1>
        </div>
        <div className={styles.progressTracker}>
          <ProgressTracker step={step} />
        </div>
      </div>
    </header>
  )
}

export default QuestionnaireHeader
