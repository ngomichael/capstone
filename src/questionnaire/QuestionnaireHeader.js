import React from 'react'
import styles from './QuestionnaireHeader.module.css'
import ProgressTracker from './ProgressTracker'

const QuestionnaireHeader = ({ step }) => {
  return (
    <header className={styles.container}>
      <div className={styles.nameAndNavContainer}>
        <div className={styles.imageNameContainer}>
          <div className={styles.productImage} />
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
