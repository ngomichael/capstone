import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './Questionnaire.module.css'
import QuestionnaireHeader from './QuestionnaireHeader'
import QuestionField from './QuestionField'
import Checkbox from './Checkbox'

const questionnaireQuestions = [
  // {
  //   questionType: 'input',
  //   question: "What's the city of zipcode you're seeking care in?*",
  //   supplementaryText: 'This will help us find providers closest to you',
  //   name: 'zipcode',
  //   type: 'text',
  //   isLongInput: false,
  // },
  // {
  //   questionType: 'cards',
  //   question: 'What kind of care are you looking for?',
  //   options: [
  //     {
  //       name: 'Therapy',
  //       description: 'A description about what therapy is lorem ipsum dat way.',
  //     },
  //     {
  //       name: 'Medication',
  //       description: 'A description about what therapy is lorem ipsum dat way.',
  //     },
  //     {
  //       name: 'Testing',
  //       description: 'A description about what therapy is lorem ipsum dat way.',
  //     },
  //     {
  //       name: 'Not Sure',
  //       description: 'A description about what therapy is lorem ipsum dat way.',
  //     },
  //   ],
  // },
  // {
  //   questionType: 'input',
  //   question: 'What are you struggling with and seeking help for?*',
  //   supplementaryText: 'I.e. depression, life transition challenges',
  //   name: 'illnesses',
  //   type: 'text',
  //   isLongInput: true,
  // },
  // {
  //   questionType: 'input',
  //   question: 'What insurance(s) do you have, if any?',
  //   supplementaryText: 'I.e. Apple Health',
  //   name: 'insurance',
  //   type: 'text',
  //   isLongInput: false,
  // },
  {
    questionType: 'checkboxes',
    question:
      'Are you looking for someone who specializes with a specific age group?',
    options: [
      'Toddlers/preschoolers (ages 0 to 6)',
      'Children (ages 6 to 10)',
      'Preteens/tweens (ages 11 to 13)',
      'Adolescents (ages 14 to 19)',
      'Young Adults',
      'Adults',
      'Elderly (ages 65+)',
    ],
  },
  // {
  //   questionType: 'input',
  //   question: 'Are you looking for someone with certain credentials?',
  //   supplementaryText: 'I.e. PhD, LICSW',
  //   name: 'credentials',
  //   type: 'text',
  //   isLongInput: false,
  // },
  // {
  //   questionType: 'input',
  //   question:
  //     'Are you looking for someone with certain personality traits or treatment approaches?',
  //   supplementaryText: 'I.e. Integrative, non-directive',
  //   name: 'traits',
  //   type: 'text',
  //   isLongInput: true,
  // },
  // {
  //   questionType: 'input',
  //   question:
  //     'Are you looking for someone that specializes in working with a certain client population or shares an identity trait?',
  //   supplementaryText: 'This will help us find providers closest to you',
  //   name: 'population',
  //   type: 'text',
  //   isLongInput: true,
  // },
]

const initialValues = {
  zipcode: '',
  // careType: '',
  illnesses: [],
  insurance: [],
  ageGroup: ['Hello'],
  credentials: [],
  traits: [],
  population: [],
}

const CareTypeCard = ({ name, description }) => {
  return (
    <div className={styles.careTypeCardContainer}>
      <p className={styles.careTypeCardName}>{name}</p>
      <p className={styles.careTypeCardDescription}>{description}</p>
    </div>
  )
}

const renderQuestions = () => {
  return questionnaireQuestions.map((question, index) => (
    <div className={styles.questionsContainer}>
      <p className={styles.questionNumber}>
        {index + 1}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </p>
      <div>
        <p className={styles.question}>{question.question}</p>
        {question.options.map((option, index) => (
          <Checkbox name="ageGroup" value={question.options[index]} />
        ))}
        {/* <input name="ageGroup" type="checkbox" /> */}
        {/* {question.questionType === 'input' ? (
          <QuestionField
            question={question.question}
            supplementaryText={question.supplementaryText}
            name={question.name}
            type={question.type}
            isLongInput={question.isLongInput}
            key={question.question}
          />
        ) : (
          <div className={styles.careTypeCardsContainer}>
            {question.options.map(option => (
              <CareTypeCard
                name={option.name}
                description={option.description}
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  ))
}

const Questionnaire = props => {
  return (
    <div className={styles.container}>
      <QuestionnaireHeader />
      <div className={styles.questionsTitleContainer}>
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
