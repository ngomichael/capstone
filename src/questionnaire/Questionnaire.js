import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import { Formik, Form, Field } from 'formik'
import styles from './questionnaire.module.css'
import { ONBOARDING_ROUTES } from '../constants/routes'
import { Checkbox } from '../common/checkbox2'
import { CheckboxSquare } from '../common/checkbox-square'
import { QuestionField } from './question-field'
import { Button, TYPES, SIZES } from '../common/button'
import { BackButton } from '../common/back-button'
import { ArrowRight } from 'react-feather'
import firebase from '../firebase/firebase'
import { AutocompleteField } from './autocomplete-field'
import { questionnaireQuestions } from '../constants/questions'
import { UserConsumer } from '../context/user-context'

const returnCorrectQuestionFormat = (
  question,
  setFieldValue,
  currPageNum,
  touched,
  errors
) => {
  const questionType = question.questionType
  if (questionType === 'autocomplete') {
    return (
      <AutocompleteField
        supplementaryText={question.supplementaryText}
        terms={question.terms}
        name={question.name}
        setFieldValue={setFieldValue}
        key={question.question}
      />
    )
  } else if (questionType === 'input') {
    return (
      <QuestionField
        supplementaryText={question.supplementaryText}
        name={question.name}
        type={question.type}
        isLongInput={question.isLongInput}
        key={question.question}
        touched={touched}
        errors={errors}
      />
    )
  } else if (questionType === 'checkbox-squares') {
    return (
      <div className={styles.careTypeCardsContainer}>
        <p className={styles.supplementaryText}>{question.supplementaryText}</p>
        {question.terms.map(term => {
          return (
            <Field
              name={question.name}
              // key={question.questionType}
              render={({ field }) => {
                return (
                  <CheckboxSquare
                    name={term.value}
                    supplementaryText={question.supplementaryText}
                    description={term.description}
                    onCheckboxClick={checked => {
                      setFieldValue(
                        new Map([...field.value.set(term.value, checked)])
                      )
                    }}
                  />
                )
              }}
            />
          )
        })}
      </div>
    )
  } else if (questionType === 'checkbox') {
    return (
      <div className={styles.ageGroupCheckboxes}>
        {question.terms.map(term => {
          return (
            <label
              className={styles.checkboxOption}
              // key={question.supplementaryText}
            >
              <Field
                name={question.name}
                className={styles.checkbox}
                render={({ field }) => {
                  return (
                    <Checkbox
                      name={term.value}
                      onChange={e => {
                        const item = e.target.name
                        const isChecked = e.target.checked
                        setFieldValue(
                          new Map([...field.value.set(item, isChecked)])
                        )
                      }}
                      checked={field.value.get(term.value)}
                    />
                  )
                }}
              />
              <span className={styles.checkboxText}>{term.value}</span>
            </label>
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

const renderQuestions = (setFieldValue, currPageNum, touched, errors) => {
  return questionnaireQuestions.map((question, index) => {
    return currPageNum === question.pageNum ? (
      <div className={styles.questionsContainer} key={index}>
        <div className={styles.arrowAndNumberContainer}>
          <p className={styles.questionNumber}>{index + 1}</p>
          <ArrowRight size={18} className={styles.arrow} />
        </div>
        <div>
          <p className={styles.question}>{question.question}</p>
          {returnCorrectQuestionFormat(
            question,
            setFieldValue,
            currPageNum,
            touched,
            errors
          )}
        </div>
      </div>
    ) : null
  })
}

export const Questionnaire = () => {
  const [currPageNum, setCurrPageNum] = useState(1)
  useEffect(() => window.scrollTo(0, 0))

  async function handleSubmit(answers) {
    await firebase.getUserProfile()
    await firebase.addUserQuestionnaireAnswers(answers)
  }

  function handleNextPage() {
    setCurrPageNum(currPageNum + 1)
  }

  function handlePreviousPage() {
    setCurrPageNum(currPageNum - 1)
  }

  return (
    <UserConsumer>
      {context => (
        <div className={styles.container}>
          <div className={styles.maxWidthContainer}>
            <div className={styles.questionsTitleContainer}>
              {currPageNum === 1 ? (
                <BackButton path={`/${ONBOARDING_ROUTES.getStarted}`} />
              ) : (
                <BackButton onClick={handlePreviousPage} />
              )}

              <p>{`Questionnaire: Page ${currPageNum} of 2`}</p>
              <h1 className={styles.title}>
                {currPageNum === 1
                  ? "First, let's figure out the essentials"
                  : "Besides the basics, is there anything else you're looking for in a provider?"}
              </h1>
              {currPageNum === 1 && (
                <p className={styles.questionnaireDescription}>
                  Excluding the first question, all questions are optional and
                  you are able to select multiple answers if it better reflects
                  the experiences you are going through. If you don't know how
                  to answer a question or if it does not apply, feel free to
                  just not answer it.
                </p>
              )}
              <Formik
                initialValues={{
                  zip_code: '',
                  issues: [],
                  age_groups: new Map(),
                  care_types: new Map(),
                  insurances: [],
                  credentials: [],
                  approaches: [],
                  populations: [],
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values)
                  //calculateResults(values)
                  setSubmitting(false)
                  navigate('/onboardingTracker/questionnaireCompleted')
                }}
              >
                {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                  <Form>
                    {renderQuestions(
                      setFieldValue,
                      currPageNum,
                      touched,
                      errors
                    )}
                    {currPageNum === 2 && (
                      <div className={styles.submitButton}>
                        <Button
                          type="submit"
                          buttonType={TYPES.PRIMARY}
                          buttonSize={SIZES.MEDIUM}
                          disabled={
                            values.zip_code.length < 5 ? 'disabled' : false
                          }
                        >
                          Finish
                        </Button>

                        <Link to={ONBOARDING_ROUTES.results}>
                          <Button
                            type="text"
                            buttonType={TYPES.SECONDARY}
                            buttonSize={SIZES.LARGE}
                            onClick={handlePreviousPage}
                            className={styles.skipButton}
                          >
                            Skip to a list of providers
                          </Button>
                        </Link>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
              <div className={styles.buttonContainer}>
                {currPageNum === 1 && (
                  <div>
                    <Button
                      type="text"
                      buttonType={TYPES.PRIMARY}
                      buttonSize={SIZES.MEDIUM}
                      onClick={handleNextPage}
                    >
                      Next
                    </Button>
                    <Link to={ONBOARDING_ROUTES.results}>
                      <Button
                        type="text"
                        buttonType={TYPES.SECONDARY}
                        buttonSize={SIZES.LARGE}
                        onClick={handlePreviousPage}
                        className={styles.skipButton}
                      >
                        Skip to a list of providers
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </UserConsumer>
  )
}
