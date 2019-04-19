import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './questionnaire.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { QuestionField } from './question-field'
import { Button, TYPES, SIZES } from '../common/button'
import { BackButton } from '../common/back-button'
import { ArrowRight } from 'react-feather'
import firebase from '../firebase/firebase'
import { AutocompleteField } from './autocomplete-field'

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
  {
    questionType: 'autocomplete',
    question: 'What kind of care are you looking for',
    supplementaryText:
      'Getting to a provider can be a big barrier in receiving care. This information helps us find providers close to you.',
    terms: [
      { id: 'Hello', value: 'Hello', label: 'Hello' },
      { id: 'Michael', value: 'Michael', label: 'Michael' },
      { id: 'Jessica', value: 'Jessica', label: 'Jessica' },
      { id: 'Benny', value: 'Benny', label: 'Benny' },
      { id: 'Chris', value: 'Chris', label: 'Chris' },
      { id: 'Justin', value: 'Justin', label: 'Justin' },
      { id: 'JJ', value: 'JJ', label: 'JJ' },
      { id: 'Ngo', value: 'Ngo', label: 'Ngo' },
    ],
    name: 'careType',
  },
  {
    questionType: 'autocomplete',
    question:
      'What are you struggling with and seeking help for? (I.e depression, life transition challenges)',
    supplementaryText:
      "Providers often have different areas of expertise. Having a provider who has experience with what you're struggling with could enhance the quality of your care.",
    terms: [
      { id: 'Hello', value: 'Hello', label: 'Hello' },
      { id: 'Michael', value: 'Michael', label: 'Michael' },
      { id: 'Jessica', value: 'Jessica', label: 'Jessica' },
      { id: 'Benny', value: 'Benny', label: 'Benny' },
      { id: 'Chris', value: 'Chris', label: 'Chris' },
      { id: 'Justin', value: 'Justin', label: 'Justin' },
      { id: 'JJ', value: 'JJ', label: 'JJ' },
      { id: 'Ngo', value: 'Ngo', label: 'Ngo' },
    ],
    name: 'issues',
  },
  {
    questionType: 'autocomplete',
    question: 'What insurance(s) do you have, if any? (I.e Apple Health)',
    supplementaryText:
      'Finding a provider that your insurance covers will make seeing a provider more affordable to you.',
    terms: [
      { id: 'Hello', value: 'Hello', label: 'Hello' },
      { id: 'Michael', value: 'Michael', label: 'Michael' },
      { id: 'Jessica', value: 'Jessica', label: 'Jessica' },
      { id: 'Benny', value: 'Benny', label: 'Benny' },
      { id: 'Chris', value: 'Chris', label: 'Chris' },
      { id: 'Justin', value: 'Justin', label: 'Justin' },
      { id: 'JJ', value: 'JJ', label: 'JJ' },
      { id: 'Ngo', value: 'Ngo', label: 'Ngo' },
    ],
    name: 'insurances',
  },
  {
    questionType: 'autocomplete',
    question:
      'Are you looking for someone with certain credentials? (I.e. PhD, LICSW)',
    supplementaryText:
      'Some patients prefer their providers have completed a certain degree or certificate program.',
    terms: [
      { id: 'Hello', value: 'Hello', label: 'Hello' },
      { id: 'Michael', value: 'Michael', label: 'Michael' },
      { id: 'Jessica', value: 'Jessica', label: 'Jessica' },
      { id: 'Benny', value: 'Benny', label: 'Benny' },
      { id: 'Chris', value: 'Chris', label: 'Chris' },
      { id: 'Justin', value: 'Justin', label: 'Justin' },
      { id: 'JJ', value: 'JJ', label: 'JJ' },
      { id: 'Ngo', value: 'Ngo', label: 'Ngo' },
    ],
    name: 'credentials',
  },
  {
    questionType: 'autocomplete',
    question:
      'Are you looking for someone with certain personality traits or treatment approaches? (I.e. Integrative, non-directive)',
    supplementaryText:
      "Providers can use a wide range of approaches. If you're looking for a particular approach, that can narrow down the providers we think are a good fit for you.",
    terms: [
      { id: 'Hello', value: 'Hello', label: 'Hello' },
      { id: 'Michael', value: 'Michael', label: 'Michael' },
      { id: 'Jessica', value: 'Jessica', label: 'Jessica' },
      { id: 'Benny', value: 'Benny', label: 'Benny' },
      { id: 'Chris', value: 'Chris', label: 'Chris' },
      { id: 'Justin', value: 'Justin', label: 'Justin' },
      { id: 'JJ', value: 'JJ', label: 'JJ' },
      { id: 'Ngo', value: 'Ngo', label: 'Ngo' },
    ],
    name: 'approaches',
  },
  {
    questionType: 'autocomplete',
    question:
      'Are you looking for someone that specializes in working with a certain client population or shares an identity trait? (I.e gender, race/ethnicity, religion/spirituality, sexual orientation, language)',
    supplementaryText:
      'Providers may have more experience with certain groups of the general population. Having a provider who has experience with challenges faced by particular demographics could enhance the quality of your care.',
    terms: [
      { id: 'Hello', value: 'Hello', label: 'Hello' },
      { id: 'Michael', value: 'Michael', label: 'Michael' },
      { id: 'Jessica', value: 'Jessica', label: 'Jessica' },
      { id: 'Benny', value: 'Benny', label: 'Benny' },
      { id: 'Chris', value: 'Chris', label: 'Chris' },
      { id: 'Justin', value: 'Justin', label: 'Justin' },
      { id: 'JJ', value: 'JJ', label: 'JJ' },
      { id: 'Ngo', value: 'Ngo', label: 'Ngo' },
    ],
    name: 'populations',
  },
]

// Create autocomplete
const returnCorrectQuestionFormat = (question, setFieldValue) => {
  const questionType = question.questionType
  if (questionType === 'autocomplete') {
    return (
      <AutocompleteField
        supplementaryText={question.supplementaryText}
        terms={question.terms}
        name={question.name}
        type={question.type}
        isLongInput={question.isLongInput}
        setFieldValue={setFieldValue}
        key={question.question}
      />
    )
  } else {
    return (
      <QuestionField
        supplementaryText={question.supplementaryText}
        name={question.name}
        type={question.type}
        isLongInput={question.isLongInput}
        key={question.question}
      />
    )
  }
}

const renderQuestions = setFieldValue => {
  return questionnaireQuestions.map((question, index) => {
    return (
      <div className={styles.questionsContainer} key={index}>
        <p className={styles.questionNumber}>{index + 1}</p>
        <ArrowRight size={18} className={styles.arrow} />
        <div>
          <p className={styles.question}>{question.question}</p>
          {returnCorrectQuestionFormat(question, setFieldValue)}
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
              issues: [],
              careType: [],
              insurances: [],
              credentials: [],
              approaches: [],
              populations: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                {renderQuestions(setFieldValue)}
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
