import React from 'react'
import styles from './QuestionnaireModal.module.css'
import Card from './Card'

const QuestionnaireModal = props => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Questionnaire</h1>
        <div className={styles.supportingTextContainer}>
          <p className={styles.subtext}>
            What type of provider are you looking for?
          </p>
          <p className={styles.skipQuestion}>
            Not sure? Skip to the next question >
          </p>
        </div>
        <Card />
      </div>
    </div>
  )
}

export default QuestionnaireModal
