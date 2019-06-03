import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import { Formik, Form, Field } from 'formik'
import styles from './questionnaire.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { ONBOARDING_ROUTES } from '../constants/routes'
import { QuestionField } from './question-field'
import { CheckboxSquare } from '../common/checkbox-square'
import { Checkbox } from '../common/checkbox2'
import { QuestionFieldNoValidation } from './question-field-no-validation'
import { Button, TYPES, SIZES } from '../common/button'
import { BackButton } from '../common/back-button'
import { ArrowRight } from 'react-feather'
import firebase from '../firebase/firebase'
import { AutocompleteField } from './autocomplete-field'

export const questionnaireQuestions = [
  {
    questionType: 'inputNoValidate',
    question: 'What is your name?*',

    name: 'name',
    pageNum: 1,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question: 'What is the address of your practice?*',

    name: 'address',
    pageNum: 1,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question: 'What is the zipcode of your practice?*',

    name: 'zip_code',
    pageNum: 1,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'checkbox-squares',
    question: 'What kind of care or services do you provide?',

    terms: [
      {
        id: 'Therapist',
        description:
          'Talking with a professional in order to work through challenges or issues',
        value: 'Therapist',
        label: 'Therapist',
      },

      {
        id: 'Medication',
        description:
          'Services relating to prescription and monitoring of medication',
        value: 'Medication',
        label: 'Medication',
      },
      {
        id: 'Testing',
        description:
          'Evaluation to help make a diagnosis and or guide treatment',
        value: 'Testing',
        label: 'Testing',
      },
    ],
    name: 'care_types',
    pageNum: 1,
  },
  {
    questionType: 'autocomplete',
    question:
      'What issues or illnesses do you provide assistance for? I.e depression, life transition challenges',

    terms: [
      { id: 'Anxiety', value: 'Anxiety', label: 'Anxiety' },
      { id: 'Depression', value: 'Depression', label: 'Depression' },
      {
        id: 'Life Transition Challenges',
        value: 'Life Transition Challenges',
        label: 'Life Transition Challenges',
      },
      {
        id: 'Relationship Issues',
        value: 'Relationship Issues',
        label: 'Relationship Issues',
      },
      {
        id: 'Eating Disorders',
        value: 'Eating Disorders',
        label: 'Eating Disorders',
      },
      {
        id: 'Anger Management',
        value: 'Anger Management',
        label: 'Anger Management',
      },
      { id: 'ADHD', value: 'ADHD', label: 'ADHD' },
      {
        id: 'Behavioral Issues',
        value: 'Behavioral Issues',
        label: 'Behavioral Issues',
      },
      { id: 'Drug Abuse', value: 'Drug Abuse', label: 'Drug Abuse' },
      { id: 'Infidelity', value: 'Infidelity', label: 'Infidelity' },
    ],
    name: 'issues',
    pageNum: 1,
  },
  {
    questionType: 'autocomplete',
    question:
      'What insurance(s) do you accept, if any? Please input all that apply.',

    terms: [
      { id: 'Aetna', value: 'Aetna', label: 'Aetna' },
      {
        id: 'Beacon Health Options',
        value: 'Beacon Health Options',
        label: 'Beacon Health Options',
      },
      {
        id: 'Blue Cross Blue Shield',
        value: 'Blue Cross Blue Shield',
        label: 'Blue Cross Blue Shield',
      },
      { id: 'Cigna', value: 'Cigna', label: 'Cigna' },
      {
        id: 'Harvard Pilgrim Health',
        value: 'Harvard Pilgrim Health',
        label: 'Harvard Pilgrim Health',
      },
      { id: 'Medicare', value: 'Medicare', label: 'Medicare' },
      { id: 'Tufts', value: 'Tufts', label: 'Tufts' },
      {
        id: 'UnitedHealthcare',
        value: 'UnitedHealthcare',
        label: 'UnitedHealthcare',
      },
      {
        id: 'University student insurance/ Affiliate extended insurance',
        value: 'University student insurance/ Affiliate extended insurance',
        label: 'University student insurance/ Affiliate extended insurance',
      },
      {
        id: "My insurance isn't listed",
        value: "My insurance isn't listed",
        label: "My insurance isn't listed",
      },
    ],
    name: 'insurances',
    pageNum: 1,
  },
  {
    questionType: 'checkbox',
    question: 'Do you specialize with a specific age group?',

    terms: [
      {
        id: 'Toddlers/preschoolers (ages 0 to 6)',
        value: 'Toddlers/preschoolers (ages 0 to 6)',
        label: 'Toddlers/preschoolers (ages 0 to 6)',
      },
      {
        id: 'Children (ages 6 to 10)',
        value: 'Children (ages 6 to 10)',
        label: 'Children (ages 6 to 10)',
      },
      {
        id: 'Preteens/tweens (ages 11 to 13)',
        value: 'Preteens/tweens (ages 11 to 13)',
        label: 'Preteens/tweens (ages 11 to 13)',
      },
      {
        id: 'Adolescents (ages 14 to 19)',
        value: 'Adolescents (ages 14 to 19)',
        label: 'Adolescents (ages 14 to 19)',
      },
      { id: 'Young Adults', value: 'Young Adults', label: 'Young Adults' },
      { id: 'Adults', value: 'Adults', label: 'Adults' },
      {
        id: 'Elderly (ages 65+)',
        value: 'Elderly (ages 65+)',
        label: 'Elderly (ages 65+)',
      },
    ],
    name: 'age_groups',
    pageNum: 1,
  },
  {
    questionType: 'autocomplete',
    question: 'What are your credentials? I.e. PhD, LICSW',

    terms: [
      {
        id: 'Marriage and Family Therapist (MA, MFT, LMFT, LCMFT)',
        value: 'Marriage and Family Therapist (MA, MFT, LMFT, LCMFT)',
        label: 'Marriage and Family Therapist (MA, MFT, LMFT, LCMFT)',
      },
      {
        id: 'Psychiatrist (MD, Doctor)',
        value: 'Psychiatrist (MD, Doctor)',
        label: 'Psychiatrist (MD, Doctor)',
      },
      {
        id: 'Psychologist: Doctorate Level (PhD, PsyD, EdD)',
        value: 'Psychologist: Doctorate Level (PhD, PsyD, EdD)',
        label: 'Psychologist: Doctorate Level (PhD, PsyD, EdD)',
      },
      {
        id: 'Psychologist: Masters Level (MA, MS, LGPC, LCPC)',
        value: 'Psychologist: Masters Level (MA, MS, LGPC, LCPC)',
        label: 'Psychologist: Masters Level (MA, MS, LGPC, LCPC)',
      },
      {
        id: 'Social Worker (MSW, LGSW, LCSW, LMSW)',
        value: 'Social Worker (MSW, LGSW, LCSW, LMSW)',
        label: 'Social Worker (MSW, LGSW, LCSW, LMSW)',
      },
      {
        id: ' Pastoral Counseling (MA, CCPT, CpastC)',
        value: ' Pastoral Counseling (MA, CCPT, CpastC)',
        label: ' Pastoral Counseling (MA, CCPT, CpastC)',
      },
    ],
    name: 'credentials',
    pageNum: 1,
  },
  {
    questionType: 'autocomplete',
    question:
      'What treatment approaches do you utilize? I.e. cognitive behavioral therapy',

    terms: [
      {
        id: 'Accelerated Experiential Dynamic Psychotherapy (AEDP)',
        value: 'Accelerated Experiential Dynamic Psychotherapy (AEDP)',
        label: 'Accelerated Experiential Dynamic Psychotherapy (AEDP)',
      },
      {
        id: 'Acceptance and Commitment Therapy',
        value: 'Acceptance and Commitment Therapy',
        label: 'Acceptance and Commitment Therapy',
      },
      { id: 'Art Therapy', value: 'Art Therapy', label: 'Art Therapy' },
      {
        id: 'Career counseling',
        value: 'Career counseling',
        label: 'Career counseling',
      },
      {
        id: 'Cognitive Behavioral Therapy (CBT)',
        value: 'Cognitive Behavioral Therapy (CBT)',
        label: 'Cognitive Behavioral Therapy (CBT)',
      },
      {
        id: 'Couples Therapy',
        value: 'Couples Therapy',
        label: 'Couples Therapy',
      },
      {
        id: 'Dance/Movement Therapy (DMT)',
        value: 'Dance/Movement Therapy (DMT)',
        label: 'Dance/Movement Therapy (DMT)',
      },
      {
        id: 'Integrative',
        value: 'Integrative',
        label: 'Integrative',
      },
      {
        id: 'Non-Directive',
        value: 'Non-Directive',
        label: 'Non-Directive',
      },
    ],

    name: 'approaches',
    pageNum: 1,
  },
  {
    questionType: 'autocomplete',
    question:
      'Do you identify with or specialize in working with a certain client population? I.e gender, race/ethnicity, religion/spirituality, sexual orientation, language',

    terms: [
      {
        id: 'Asian/Asian-American therapists',
        value: 'Asian/Asian-American therapists',
        label: 'Asian/Asian-American therapists',
      },
      {
        id: 'Black/African-American therapists',
        value: 'Black/African-American therapists',
        label: 'Black/African-American therapists',
      },
      {
        id: 'Latinx therapists',
        value: 'Latinx therapists',
        label: 'Latinx therapists',
      },
      {
        id: 'LGBTQ+ therapists',
        value: 'LGBTQ therapists',
        label: 'LGBTQ therapists',
      },
      {
        id: 'Therapists of color',
        value: 'Therapists of color',
        label: 'Therapists of color',
      },
      {
        id: 'Buddhist therapists',
        value: 'Buddhist therapists',
        label: 'Buddhist therapists',
      },
      {
        id: 'Christian therapists',
        value: 'Christian therapists',
        label: 'Christian therapists',
      },
      {
        id: 'Hindu therapists',
        value: 'Hindu therapists',
        label: 'Hindu therapists',
      },
      {
        id: 'Muslim therapists',
        value: 'Muslim therapists',
        label: 'Muslim therapists',
      },
      {
        id: 'Jain therapists',
        value: 'Jain therapists',
        label: 'Jain therapists',
      },
      {
        id: 'Jewish therapists',
        value: 'Jewish therapists',
        label: 'Jewish therapists',
      },
      {
        id: 'Sikh therapists',
        value: 'Sikh therapists',
        label: 'Sikh therapists',
      },
      {
        id: 'Spanish-speaking Therapist',
        value: 'Spanish-speaking Therapist',
        label: 'Spanish-speaking Therapist',
      },
      {
        id: 'Female therapists',
        value: 'Female therapists',
        label: 'Female therapists',
      },
      {
        id: 'Male therapists',
        value: 'Male therapists',
        label: 'Male therapists',
      },
      {
        id: 'Non-binary therapists',
        value: 'Non-binary therapists',
        label: 'Non-binary therapists',
      },
    ],
    name: 'populations',
    pageNum: 1,
  },
  {
    questionType: 'inputNoValidate',
    question:
      "Each provider profile has a biography section, explaining that individual's background, education, and other information they would like potential clients to know. Please provide your biography in the space below",
    name: 'biography',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'inputNoValidate',
    question: 'What is your email?*',
    name: 'email',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'checkbox',
    question:
      'What forms of payment do you accept besides insurance, if any? Please mark all that apply.',

    terms: [
      {
        id: 'Credit card',
        value: 'Credit card',
        label: 'Credit card',
      },
      {
        id: 'Debit card',
        value: 'Debit card',
        label: 'Debit card',
      },
      {
        id: 'Cash',
        value: 'Cash',
        label: 'Cash',
      },
      {
        id: 'Check',
        value: 'Check',
        label: 'Check',
      },
      { id: 'Venmo', value: 'Venmo', label: 'Venmo' },
      { id: 'Paypal', value: 'Paypal', label: 'Paypal' },
    ],
    name: 'payment_type',
    pageNum: 2,
  },
  {
    questionType: 'checkbox',
    question:
      'Are you currently accepting new clients? Your response wil be reflected on your profile.',

    terms: [
      {
        id: 'Yes',
        value: 'Yes',
        label: 'Yes',
      },
      {
        id: 'No',
        value: 'No',
        label: 'No',
      },
    ],
    name: 'accepting_clients',
    pageNum: 2,
  },

  {
    questionType: 'inputNoValidate',
    question: 'What is your phone number?',

    name: 'phone_number',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },

  {
    questionType: 'inputNoValidate',
    question:
      'What is the cost of treatment? You might explain the price per session and the different prices with and without insurance. Please be as specific as possible',
    name: 'cost',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'inputNoValidate',
    question: "What is your practice's website?",
    name: 'website',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  // {
  //   questionType: 'autocomplete',
  //   question:
  //     'We will periodically remind you to update your profile to make sure those seeking services have the best experience possible. How would you like to be contacted? Please check all that apply.*',

  //   terms: [
  //     {
  //       id: 'Email',
  //       value: 'Email',
  //       label: 'Email',
  //     },
  //     {
  //       id: 'Phone',
  //       value: 'Phone',
  //       label: 'Phone',
  //     },
  //   ],
  //   name: 'contact',
  //   pageNum: 2,
  // },
  // {
  //   questionType: 'autocomplete',
  //   question: 'How often would you like to be reminded to update your profile?',
  //   terms: [
  //     {
  //       id: 'Email',
  //       value: 'Email',
  //       label: 'Email',
  //     },
  //     {
  //       id: 'Phone',
  //       value: 'Phone',
  //       label: 'Phone',
  //     },
  //   ],
  //   name: 'reminders',
  //   pageNum: 2,
  // },
]

const returnCorrectQuestionFormat = (
  question,
  setFieldValue,
  touched,
  errors
) => {
  const questionType = question.questionType
  if (questionType === 'autocomplete') {
    return (
      <AutocompleteField
        terms={question.terms}
        name={question.name}
        setFieldValue={setFieldValue}
        key={question.question}
      />
    )
  } else if (questionType === 'inputNoValidate') {
    return (
      <QuestionFieldNoValidation
        name={question.name}
        type={question.type}
        key={question.question}
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
    return (
      <QuestionField
        name={question.name}
        type={question.type}
        isLongInput={question.isLongInput}
        key={question.question}
        touched={touched}
        errors={errors}
      />
    )
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
            touched,
            errors
          )}
        </div>
      </div>
    ) : null
  })
}

export const ProviderQuestionnaire = () => {
  const [currPageNum, setCurrPageNum] = useState(1)
  useEffect(() => window.scrollTo(0, 0))

  async function handleSubmit(answers) {
    await firebase.addProviderQuestionnaireAnswers(answers)
  }

  function handleNextPage() {
    setCurrPageNum(currPageNum + 1)
  }

  function handlePreviousPage() {
    setCurrPageNum(currPageNum - 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.maxWidthContainer}>
        <div className={styles.questionsTitleContainer}>
          {currPageNum === 1 ? (
            <BackButton path="/getStarted" />
          ) : (
            <BackButton onClick={handlePreviousPage} />
          )}

          <p>{`Questionnaire: Page ${currPageNum} of 2`}</p>
          <h1 className={styles.title}>
            {currPageNum === 1
              ? "First, let's start with the basics"
              : "Besides the basics, let's gather some more information for your profile"}
          </h1>
          <Formik
            initialValues={{
              address: '',
              zip_code: '',
              phone_number: '',
              website: '',
              care_types: new Map(),
              issues: [],
              age_groups: new Map(),
              credentials: [],
              approaches: [],
              populations: [],
              insurances: [],
              email: '',
              name: '',
              payment_type: new Map(),
              cost: '',
              biography: '',
              accepting_clients: new Map(),
              // contact: [],
              // reminders: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              handleSubmit(values)
              setSubmitting(false)
              navigate('/onboardingTracker/questionnaireCompleted')
            }}
          >
            {({ isSubmitting, setFieldValue, values, touched, errors }) => (
              <Form>
                {renderQuestions(setFieldValue, currPageNum, touched, errors)}
                {currPageNum === 2 && (
                  <div className={styles.submitButton}>
                    <Button
                      type="submit"
                      buttonType={TYPES.PRIMARY}
                      buttonSize={SIZES.MEDIUM}
                      disabled={values.zip_code.length < 5 ? 'disabled' : false}
                    >
                      Finish
                    </Button>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
