import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
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
    question:
      'What is the address of your practice, including the city and zipcode?*',

    name: 'address',
    pageNum: 1,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'autocomplete',
    question: 'What kind of care or services do you provide?',

    terms: [
      { id: 'Therapist', value: 'Therapist', label: 'Therapist' },
      {
        id: 'Medication',
        value: 'Medication',
        label: 'Medication',
      },
      {
        id: 'Testing',
        value: 'Testing',
        label: 'Testing',
      },
      { id: 'Not sure', value: 'Not sure', label: 'Not sure' },
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
    questionType: 'autocomplete',
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
        id:
          'Social Worker (MSW, LGSW, LCSW, LMSW, LCSW-C, LISW, LSW and other SW licenses)',
        value:
          'Social Worker (MSW, LGSW, LCSW, LMSW, LCSW-C, LISW, LSW and other SW licenses)',
        label:
          'Social Worker (MSW, LGSW, LCSW, LMSW, LCSW-C, LISW, LSW and other SW licenses)',
      },
      {
        id: ' Pastoral Counseling (MA, CCPT, CpastC, NCPC, NCCA)',
        value: ' Pastoral Counseling (MA, CCPT, CpastC, NCPC, NCCA)',
        label: ' Pastoral Counseling (MA, CCPT, CpastC, NCPC, NCCA)',
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
        id: 'Dialectical Behavioral Therapy (DBT)',
        value: 'Dialectical Behavioral Therapy (DBT)',
        label: 'Dialectical Behavioral Therapy (DBT)',
      },
      {
        id: 'Emotionally Focused Couples Therapy',
        value: 'Emotionally Focused Couples Therapy',
        label: 'Emotionally Focused Couples Therapy',
      },
      {
        id: 'Emotional Freedom Technique (Tapping)',
        value: 'Emotional Freedom Technique (Tapping)',
        label: 'Emotional Freedom Technique (Tapping)',
      },
      {
        id: 'Existential Therapy',
        value: 'Existential Therapy',
        label: 'Existential Therapy',
      },
      {
        id: 'Exposure and Response Prevention',
        value: 'Exposure and Response Prevention',
        label: 'Exposure and Response Prevention',
      },
      {
        id: 'Eye Movement Desensitization and Reprocessing (EMDR)',
        value: 'Eye Movement Desensitization and Reprocessing (EMDR)',
        label: 'Eye Movement Desensitization and Reprocessing (EMDR)',
      },
      {
        id: 'Gestalt Therapy',
        value: 'Gestalt Therapy',
        label: 'Gestalt Therapy',
      },
      {
        id: 'Habit Reversal Therapy',
        value: 'Habit Reversal Therapy',
        label: 'Habit Reversal Therapy',
      },
      {
        id: 'Holistic Therapy',
        value: 'Holistic Therapy',
        label: 'Holistic Therapy',
      },
      {
        id: 'Internal Family Systems',
        value: 'Internal Family Systems',
        label: 'Internal Family Systems',
      },
      {
        id: 'Interpersonal Therapy',
        value: 'Interpersonal Therapy',
        label: 'Interpersonal Therapy',
      },
      {
        id: 'Mindfulness Practices',
        value: 'Mindfulness Practices',
        label: 'Mindfulness Practices',
      },
      {
        id: 'Mindfulness Based Stress Reduction',
        value: 'Mindfulness Based Stress Reduction',
        label: 'Mindfulness Based Stress Reduction',
      },
      {
        id: 'Motivational Interviewing',
        value: 'Motivational Interviewing',
        label: 'Motivational Interviewing',
      },
      {
        id: 'Multicultural Therapy',
        value: 'Multicultural Therapy',
        label: 'Multicultural Therapy',
      },
      {
        id: 'Narrative Therapy',
        value: 'Narrative Therapy',
        label: 'Narrative Therapy',
      },
      {
        id: 'Pastoral Counseling',
        value: 'Pastoral Counseling',
        label: 'Pastoral Counseling',
      },
      {
        id: 'Positive Psychology',
        value: 'Positive Psychology',
        label: 'Positive Psychology',
      },
      {
        id: 'Psychoanalytic Therapy',
        value: 'Psychoanalytic Therapy',
        label: 'Psychoanalytic Therapy',
      },
      {
        id: 'Psychodynamic Therapy',
        value: 'Psychodynamic Therapy',
        label: 'Psychodynamic Therapy',
      },
      { id: 'Sex therapy', value: 'Sex therapy', label: 'Sex therapy' },
      {
        id: 'Solution-focused Therapy',
        value: 'Solution-focused Therapy',
        label: 'Solution-focused Therapy',
      },
      {
        id: 'Sports psychology',
        value: 'Sports psychology',
        label: 'Sports psychology',
      },
      {
        id: 'Supportive Therapy',
        value: 'Supportive Therapy',
        label: 'Supportive Therapy',
      },
      { id: 'Yoga', value: 'Yoga', label: 'Yoga' },
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
    questionType: 'input',
    question: 'What is your email?*',

    name: 'email',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question: 'What is your phone number?*',

    name: 'phone_number',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question: "What is your practice's website?*",
    name: 'website',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'input',
    question: 'What is your name?*',

    name: 'name',
    pageNum: 2,
    type: 'text',
    isLongInput: false,
  },
  {
    questionType: 'autocomplete',
    question:
      'We will periodically remind you to update your profile to make sure those seeking services have the best experience possible. How would you like to be contacted? Please check all that apply.*',

    terms: [
      {
        id: 'Email',
        value: 'Email',
        label: 'Email',
      },
      {
        id: 'Phone',
        value: 'Phone',
        label: 'Phone',
      },
    ],
    name: 'contact',
    pageNum: 2,
  },
  {
    questionType: 'autocomplete',
    question: 'How often would you like to be reminded to update your profile?',
    terms: [
      {
        id: 'Email',
        value: 'Email',
        label: 'Email',
      },
      {
        id: 'Phone',
        value: 'Phone',
        label: 'Phone',
      },
    ],
    name: 'reminders',
    pageNum: 2,
  },
]

const returnCorrectQuestionFormat = (question, setFieldValue, currPageNum) => {
  const questionType = question.questionType
  if (questionType === 'autocomplete') {
    return (
      <AutocompleteField
        terms={question.terms}
        name={question.name}
        // type={question.type}
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

export const ProviderQuestionnaire = () => {
  const [currPageNum, setCurrPageNum] = useState(1)
  async function handleSubmit(answers) {
    await firebase.getUserProfile()
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
      <OnboardingHeader step={1} />
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
              ? "First, let's learn more about your practice"
              : 'Now, let us know how to get in touch with you in the future?'}
          </h1>
          <Formik
            initialValues={{
              zip_code: '',
              email: '',
              phone_number: '',
              website: '',
              name: '',
              address: '',
              contact: [],
              reminders: [],
              issues: [],
              age_groups: [],
              care_types: [],
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
