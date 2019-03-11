import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './Questionnaire.module.css'
import QuestionnaireHeader from './QuestionnaireHeader'
import QuestionField from './QuestionField'

const questionnaireQuestions = [
  {
    questionType: 'input',
    question: "What's the city of zipcode you're seeking care in?*",
    supplementaryText: 'This will help us find providers closest to you',
    name: 'zipcode',
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'cards',
    question: 'What kind of care are you looking for?',
    name: 'Therapy',
    description: 'A description about what therapy is lorem ipsum dat way.',
  },
  {
    questionType: 'input',
    question: 'What are you struggling with and seeking help for?*',
    supplementaryText: 'I.e. depression, life transition challenges',
    name: 'illnesses',
    type: 'text',
    isLongInput: true,
  },
  {
    questionType: 'input',
    question: 'What insurance(s) do you have, if any?',
    supplementaryText: 'I.e. Apple Health',
    name: 'insurance',
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question: 'Are you looking for someone with certain credentials?',
    supplementaryText: 'I.e. PhD, LICSW',
    name: 'credentials',
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question:
      'Are you looking for someone with certain personality traits or treatment approaches?',
    supplementaryText: 'I.e. Integrative, non-directive',
    name: 'traits',
    type: 'text',
    isLongInput: true,
  },
  {
    questionType: 'input',
    question:
      'Are you looking for someone that specializes in working with a certain client population or shares an identity trait?',
    supplementaryText: 'This will help us find providers closest to you',
    name: 'population',
    type: 'text',
    isLongInput: true,
  },
]

const initialValues = {
  zipcode: '',
  // careType: '',
  illnesses: [],
  insurance: [],
  // ageGroup: [],
  credentials: [],
  traits: [],
  population: [],
}

const CareTypeCard = ({ name, description }) => {
  return (
    <div className={styles.careTypeContainer}>
      <p className={styles.careTypeName}>{name}</p>
      <p className={styles.careTypeDescription}>{description}</p>
    </div>
  )
}

const renderQuestions = () => {
  return questionnaireQuestions.map((question, index) => (
    <QuestionField
      question={question.question}
      supplementaryText={question.supplementaryText}
      name={question.name}
      type={question.type}
      isLongInput={question.isLongInput}
      questionNumber={index + 1}
      key={question.question}
    />
  ))
}

const Questionnaire = props => {
  return (
    <div className={styles.container}>
      <QuestionnaireHeader />
      <div className={styles.questionsContainer}>
        <h1 className={styles.title}>Questionnaire</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {renderQuestions()}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                Finish
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Questionnaire
