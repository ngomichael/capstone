import React, { useState } from 'react'
import { Link } from '@reach/router'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './Questionnaire.module.css'
import QuestionnaireHeader from './QuestionnaireHeader'
import QuestionField from './QuestionField'
import Checkbox from './Checkbox'

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
    options: [
      {
        name: 'Therapy',
        description: 'Talking with a professional to work through challenges.',
      },
      {
        name: 'Medication',
        description: 'Services relating to prescription medication',
      },
      {
        name: 'Testing',
        description: 'Evaluations to help make a diagnosis.',
      },
      {
        name: 'Not Sure',
        description: 'Types of care not covered by other options',
      },
    ],
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
    supplementaryText:
      'I.e gender, race/ethnicity, religion/spirituality, sexual orientation, language',
    name: 'population',
    type: 'text',
    isLongInput: true,
  },
]

const initialValues = {
  zipcode: '',
  careType: '',
  illnesses: [],
  insurance: [],
  ageGroup: [],
  credentials: [],
  traits: [],
  population: [],
}

const CareTypeCard = ({ name, description }) => {
  const [isCardClicked, setIsCardClicked] = useState(false)

  function handleCardClicked() {
    setIsCardClicked(!isCardClicked)
  }
  return (
    <div
      className={
        isCardClicked ? styles.activeCareTypeCard : styles.careTypeCardContainer
      }
      onClick={handleCardClicked}
    >
      <p
        className={
          isCardClicked ? styles.activeCareTypeName : styles.careTypeCardName
        }
      >
        {name}
      </p>
      <p className={styles.careTypeCardDescription}>{description}</p>
    </div>
  )
}

const returnCorrectQuestionFormat = question => {
  const questionType = question.questionType
  if (questionType === 'input') {
    return (
      <QuestionField
        question={question.question}
        supplementaryText={question.supplementaryText}
        name={question.name}
        type={question.type}
        isLongInput={question.isLongInput}
        key={question.question}
      />
    )
  } else if (questionType === 'cards') {
    return (
      <div className={styles.careTypeCardsContainer}>
        {question.options.map(option => (
          <CareTypeCard name={option.name} description={option.description} />
        ))}
      </div>
    )
  } else {
    return (
      <div className={styles.checkboxesContainer}>
        {question.options.map((option, index) => (
          <Checkbox name="ageGroup" value={question.options[index]} />
        ))}
      </div>
    )
  }
}

const renderQuestions = () => {
  return questionnaireQuestions.map((question, index) => {
    return (
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
          {returnCorrectQuestionFormat(question)}
        </div>
      </div>
    )
  })
}

const Questionnaire = props => {
  return (
    <div className={styles.container}>
      <QuestionnaireHeader step={1} />
      <Link to="/" className={styles.backButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <p>Back</p>
      </Link>
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
              <Link to="/questionnaireCompleted">
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  Finish
                </button>
              </Link>
            </Form>
          )}
        </Formik>
        {/* For demo
        <button type="submit" className={styles.submitButton}>
          Finish
        </button> */}
      </div>
      {/* <div className={styles.footer}>
        <div className={styles.leftSideActions}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1AAE9F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '20px', marginLeft: '20px' }}
            className={styles.favorite}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <a
            href="https://www.google.com"
            rel="noreferrer noopener"
            target="_blank"
            style={{ color: '#149184' }}
          >
            Get Directions
          </a>
        </div>
        <button className={styles.interestedButton}>Finish</button>
      </div> */}
    </div>
  )
}

export default Questionnaire
