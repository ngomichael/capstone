import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './Questionnaire.module.css'
import QuestionnaireHeader from './QuestionnaireHeader'
import InputField from './InputField'

const questionnaireQuestions = [
  {
    question: "What's the city of zipcode you're seeking care in?*",
    supplementaryText: 'This will help us find providers closest to you',
    name: 'zipcode',
    type: 'text',
    isLongInput: false,
  },
  {
    question: 'What are you struggling with and seeking help for?*',
    supplementaryText: 'I.e. depression, life transition challenges',
    name: 'illnesses',
    type: 'text',
    isLongInput: true,
  },
  {
    question: 'What insurance(s) do you have, if any?',
    supplementaryText: 'I.e. Apple Health',
    name: 'insurance',
    type: 'text',
    isLongInput: false,
  },
  {
    question: 'Are you looking for someone with certain credentials?',
    supplementaryText: 'I.e. PhD, LICSW',
    name: 'credentials',
    type: 'text',
    isLongInput: false,
  },
  {
    question:
      'Are you looking for someone with certain personality traits or treatment approaches?',
    supplementaryText: 'I.e. Integrative, non-directive',
    name: 'traits',
    type: 'text',
    isLongInput: true,
  },
  {
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
              {questionnaireQuestions.map((question, index) => (
                <InputField
                  question={question.question}
                  supplementaryText={question.supplementaryText}
                  name={question.name}
                  type={question.type}
                  isLongInput={question.isLongInput}
                  questionNumber={index}
                  key={question.question}
                />
              ))}

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
