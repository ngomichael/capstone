import React from 'react'
import styles from './QuestionnaireModal.module.css'
import Card from './Card'

const providerTypes = [
  {
    providerType: 'Therapist',
    providerDescription: 'The ones that talk to people',
  },
  {
    providerType: 'Psychiatrist',
    providerDescription: 'The ones that medicate',
  },
  {
    providerType: 'Psychological Testing',
    providerDescription: 'The ones that check your kids',
  },
  {
    providerType: 'Not sure/None of these',
    providerDescription: "The ones that don't know",
  },
]

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
        <div className={styles.cardContainer}>
          {providerTypes.map(provider => (
            <Card
              providerType={provider.providerType}
              providerDescription={provider.providerDescription}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireModal
