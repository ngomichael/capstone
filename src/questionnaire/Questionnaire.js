import React, { useState, useEffect } from 'react'
import { Redirect, navigate } from '@reach/router'
import { Formik, Form } from 'formik'
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
    pageNum: 1,
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
    pageNum: 1,
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
    pageNum: 1,
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
    pageNum: 1,
  },
  {
    questionType: 'autocomplete',
    question:
      'Are you looking for someone who specializes with a specific age group?',
    supplementaryText:
      'Providers may have more experience with certain age groups. Having a provider who has experience with your age group could enhance the quality of your care.',
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
    name: 'ageGroup',
    pageNum: 2,
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
    pageNum: 2,
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
    pageNum: 2,
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
    pageNum: 2,
  },
]

// Create autocomplete
const returnCorrectQuestionFormat = (question, setFieldValue, currPageNum) => {
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
        currPageNum={currPageNum}
        pageNum={question.pageNum}
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
        currPageNum={currPageNum}
      />
    )
  }
}

const renderQuestions = (setFieldValue, currPageNum) => {
  return questionnaireQuestions.map((question, index) => {
    return currPageNum === question.pageNum ? (
      <div className={styles.questionsContainer} key={index}>
        <p className={styles.questionNumber}>{index + 1}</p>
        <ArrowRight size={18} className={styles.arrow} />
        <div>
          <p className={styles.question}>{question.question}</p>
          {returnCorrectQuestionFormat(question, setFieldValue, currPageNum)}
        </div>
      </div>
    ) : null
  })
}

export const Questionnaire = () => {
  const [currPageNum, setCurrPageNum] = useState(1)
  async function handleSubmit(answers) {
    await firebase.getUserProfile()
    await firebase.addUserQuestionnaire(answers)
  }

  function handleNextPage() {
    setCurrPageNum(currPageNum + 1)
  }

  function handlePreviousPage() {
    setCurrPageNum(currPageNum - 1)
  }

  return (
    <div className={styles.container}>
      <OnboardingHeader step={1} />
      <div className={styles.maxWidthContainer}>
        <div className={styles.questionsTitleContainer}>
          <BackButton path="/getStarted" />
          <p>{`Questionnaire: Page ${currPageNum} of 2`}</p>
          <h1 className={styles.title}>
            {currPageNum === 1
              ? "First, let's figure out the essentials"
              : "Besides the basics, is there anything else you're looking for in a provider?"}
          </h1>
          <Formik
            initialValues={{
              zip_code: '',
              issues: [],
              ageGroup: [],
              careType: [],
              insurances: [],
              credentials: [],
              approaches: [],
              populations: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setSubmitting(false)
              navigate('/questionnaireCompleted')
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                {renderQuestions(setFieldValue, currPageNum)}
                {currPageNum === 2 && (
                  <div className={styles.submitButton}>
                    <Button
                      type="submit"
                      buttonType={TYPES.PRIMARY}
                      buttonSize={SIZES.MEDIUM}
                      disabled={isSubmitting}
                    >
                      Finish
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
          <div className={styles.buttonContainer}>
            {currPageNum === 1 ? (
              <Button
                type="text"
                buttonType={TYPES.PRIMARY}
                buttonSize={SIZES.MEDIUM}
                onClick={handleNextPage}
              >
                Next
              </Button>
            ) : (
              <Button
                type="text"
                buttonType={TYPES.PRIMARY}
                buttonSize={SIZES.MEDIUM}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
