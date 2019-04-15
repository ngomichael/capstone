import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './questionnaire.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { QuestionField } from './question-field'
import { Checkbox } from '../common/checkbox'
import { Button, TYPES, SIZES } from '../common/button'
import { BackButton } from '../common/back-button'
import { ArrowRight } from 'react-feather'
import { withAuth } from '../auth-context'
import firebase from '../firebase/firebase'
import { CareTypeCard } from './care-type-card'

export const questionnaireQuestions = [
  {
    questionType: 'input',
    question: "What's the city or zipcode you're seeking care in?*",
    supplementaryText:
      'Getting to a provider can be a big barrier in receiving care. This information helps us find providers close to you.',
    name: 'zip_code',
    type: 'text',
    isLongInput: false,
  },
  // {
  //   questionType: 'cards',
  //   question: 'What kind of care are you looking for?',
  //   supplementaryText:
  //     "There are a wide variety of mental health services available - let's narrow them down!.",
  //   options: [
  //     {
  //       name: 'Therapy',
  //       description: 'Talking with a professional to work through challenges.',
  //     },
  //     {
  //       name: 'Medication',
  //       description: 'Services relating to prescription medication',
  //     },
  //     {
  //       name: 'Testing',
  //       description: 'Evaluations to help make a diagnosis.',
  //     },
  //     {
  //       name: 'Not Sure',
  //       description: 'Types of care not covered by other options',
  //     },
  //   ],
  // },
  {
    questionType: 'input',
    question:
      'What are you struggling with and seeking help for? (I.e depression, life transition challenges)',
    supplementaryText:
      "Providers often have different areas of expertise. Having a provider who has experience with what you're struggling with could enhance the quality of your care.",
    name: 'issues',
    type: 'text',
    isLongInput: true,
  },
  {
    questionType: 'input',
    question: 'What insurance(s) do you have, if any? (I.e Apple Health)',
    supplementaryText:
      'Finding a provider that your insurance covers will make seeing a provider more affordable to you.',
    name: 'insurances',
    type: 'text',
    isLongInput: false,
  },
  // {
  //   questionType: 'checkboxes',
  //   question:
  //     'Are you looking for someone who specializes with a specific age group?',
  //   supplementaryText:
  //     'Providers may have more experience with certain age groups. Having a provider who has experience with your age could enhance the quality of your care.',
  //   options: [
  //     'Toddlers/preschoolers (ages 0 to 6)',
  //     'Children (ages 6 to 10)',
  //     'Preteens/tweens (ages 11 to 13)',
  //     'Adolescents (ages 14 to 19)',
  //     'Young Adults',
  //     'Adults',
  //     'Elderly (ages 65+)',
  //   ],
  // },
  {
    questionType: 'input',
    question:
      'Are you looking for someone with certain credentials? (I.e. PhD, LICSW)',
    supplementaryText:
      'Some patients prefer their providers have completed a certain degree or certificate program.',
    name: 'credentials',
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question:
      'Are you looking for someone with certain personality traits or treatment approaches? (I.e. Integrative, non-directive)',
    supplementaryText:
      "Providers can use a wide range of approaches. If you're looking for a particular approach, that can narrow down the providers we think are a good fit for you.",
    name: 'approaches',
    type: 'text',
    isLongInput: true,
  },
  {
    questionType: 'input',
    question:
      'Are you looking for someone that specializes in working with a certain client population or shares an identity trait? (I.e gender, race/ethnicity, religion/spirituality, sexual orientation, language)',
    supplementaryText:
      'Providers may have more experience with certain groups of the general population. Having a provider who has experience with challenges faced by particular demographics could enhance the quality of your care.',
    name: 'populations',
    type: 'text',
    isLongInput: true,
  },
]

const returnCorrectQuestionFormat = question => {
  const questionType = question.questionType
  if (questionType === 'input') {
    return (
      <QuestionField
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
        {question.options.map((option, index) => (
          <CareTypeCard
            name={option.name}
            description={option.description}
            key={index}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div className={styles.checkboxesContainer}>
        {question.options.map((option, index) => (
          <Checkbox
            name="ageGroup"
            value={question.options[index]}
            key={index}
          />
        ))}
      </div>
    )
  }
}

const renderQuestions = () => {
  return questionnaireQuestions.map((question, index) => {
    return (
      <div className={styles.questionsContainer} key={index}>
        <p className={styles.questionNumber}>{index + 1}</p>
        <ArrowRight size={18} className={styles.arrow} />
        <div>
          <p className={styles.question}>{question.question}</p>
          {returnCorrectQuestionFormat(question)}
        </div>
      </div>
    )
  })
}

export const Questionnaire = () => {
  async function handleSubmit(answers) {
    await firebase.getUserProfile()
    await firebase.addUserQuestionnaire(answers)
  }

  return (
    <div className={styles.container}>
      <OnboardingHeader step={1} />
      <div className={styles.maxWidthContainer}>
        <div className={styles.questionsTitleContainer}>
          <BackButton path="/getStarted" />
          <h1 className={styles.title}>
            First, let's figure out the essentials
          </h1>
          <Formik
            initialValues={{
              zip_code: '',
              issues: '',
              insurances: '',
              credentials: '',
              approaches: '',
              populations: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {renderQuestions()}
                {/* <Link to="/questionnaireCompleted"> */}
                <Button
                  type="submit"
                  buttonType={TYPES.PRIMARY}
                  buttonSize={SIZES.MEDIUM}
                  disabled={isSubmitting}
                >
                  Finish
                </Button>
                {/* </Link> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
