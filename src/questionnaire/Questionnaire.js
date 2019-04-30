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
      {  id: "Therapist", value: "Therapist", label: "Therapist" }
      ,{  id: "Psychiatrist (medication)", value: "Psychiatrist (medication)", label: "Psychiatrist (medication)" }
      ,{  id: "Couples counselor", value: "Couples counselor", label: "Couples counselor" }
      ,{  id: "Dietitian", value: "Dietitian", label: "Dietitian" }
      ,{  id: "Life coach", value: "Life coach", label: "Life coach" }
      ,{  id: "Group practice", value: "Group practice", label: "Group practice" }
      ,{  id: "Psychologist", value: "Psychologist", label: "Psychologist" }
      ,{  id: "Social worker", value: "Social worker", label: "Social worker" }
      ,{  id: "Counselor", value: "Counselor", label: "Counselor" }
      ,{  id: "Art therapist", value: "Art therapist", label: "Art therapist" }
      ,{  id: "Child psychiatrist", value: "Child psychiatrist", label: "Child psychiatrist" }
      ,{  id: "Child therapist", value: "Child therapist", label: "Child therapist" }
      ,{  id: "Sex therapist", value: "Sex therapist", label: "Sex therapist" }
      ,{  id: "Marriage counselor", value: "Marriage counselor", label: "Marriage counselor" }
      ,{  id: "Premarital counselor", value: "Premarital counselor", label: "Premarital counselor" }
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
      {  id: "Aetna", value: "Aetna", label: "Aetna" }
      ,{  id: "Beacon Health Options", value: "Beacon Health Options", label: "Beacon Health Options" }
      ,{  id: "Blue Cross Blue Shield", value: "Blue Cross Blue Shield", label: "Blue Cross Blue Shield" }
      ,{  id: "Cigna", value: "Cigna", label: "Cigna" }
      ,{  id: "Harvard Pilgrim Health", value: "Harvard Pilgrim Health", label: "Harvard Pilgrim Health" }
      ,{  id: "Medicare", value: "Medicare", label: "Medicare" }
      ,{  id: "Tufts", value: "Tufts", label: "Tufts" }
      ,{  id: "UnitedHealthcare", value: "UnitedHealthcare", label: "UnitedHealthcare" }
      ,{  id: "University student insurance/ Affiliate extended insurance", value: "University student insurance/ Affiliate extended insurance", label: "University student insurance/ Affiliate extended insurance" }
      ,{  id: "My insurance isn't listed", value: "My insurance isn't listed", label: "My insurance isn't listed" }
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
      {  id: "Adult (26+)", value: "Adult (26+)", label: "Adult (26+)" }
      ,{  id: "College / Young Adult (18 - 26)", value: "College / Young Adult (18 - 26)", label: "College / Young Adult (18 - 26)" }
      ,{  id: "Teenager (13 - 17)", value: "Teenager (13 - 17)", label: "Teenager (13 - 17)" }
      ,{  id: "Child (<12) ", value: "Child (<12) ", label: "Child (<12) " }
      ,{  id: "Senior (65+)", value: "Senior (65+)", label: "Senior (65+)" }
      ,{  id: "Couples", value: "Couples", label: "Couples" }
      ,{  id: "Parents", value: "Parents", label: "Parents" }
      ,{  id: "Family", value: "Family", label: "Family" }
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
      {  id: "Marriage and Family Therapist (MA, MFT, LMFT, LCMFT)", value: "Marriage and Family Therapist (MA, MFT, LMFT, LCMFT)", label: "Marriage and Family Therapist (MA, MFT, LMFT, LCMFT)" }
,{  id: "Psychiatrist (MD, Doctor)", value: "Psychiatrist (MD, Doctor)", label: "Psychiatrist (MD, Doctor)" }
,{  id: "Psychologist: Doctorate Level (PhD, PsyD, EdD)", value: "Psychologist: Doctorate Level (PhD, PsyD, EdD)", label: "Psychologist: Doctorate Level (PhD, PsyD, EdD)" }
,{  id: "Psychologist: Masters Level (MA, MS, LGPC, LCPC)", value: "Psychologist: Masters Level (MA, MS, LGPC, LCPC)", label: "Psychologist: Masters Level (MA, MS, LGPC, LCPC)" }
,{  id: "Social Worker (MSW, LGSW, LCSW, LMSW, LCSW-C, LISW, LSW and other SW licenses)", value: "Social Worker (MSW, LGSW, LCSW, LMSW, LCSW-C, LISW, LSW and other SW licenses)", label: "Social Worker (MSW, LGSW, LCSW, LMSW, LCSW-C, LISW, LSW and other SW licenses)" }
,{  id: " Pastoral Counseling (MA, CCPT, CpastC, NCPC, NCCA)", value: " Pastoral Counseling (MA, CCPT, CpastC, NCPC, NCCA)", label: " Pastoral Counseling (MA, CCPT, CpastC, NCPC, NCCA)" }
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
      {  id: "Accelerated Experiential Dynamic Psychotherapy (AEDP)", value: "Accelerated Experiential Dynamic Psychotherapy (AEDP)", label: "Accelerated Experiential Dynamic Psychotherapy (AEDP)" }
      ,{  id: "Acceptance and Commitment Therapy", value: "Acceptance and Commitment Therapy", label: "Acceptance and Commitment Therapy" }
      ,{  id: "Art Therapy", value: "Art Therapy", label: "Art Therapy" }
      ,{  id: "Career counseling", value: "Career counseling", label: "Career counseling" }
      ,{  id: "Cognitive Behavioral Therapy (CBT)", value: "Cognitive Behavioral Therapy (CBT)", label: "Cognitive Behavioral Therapy (CBT)" }
      ,{  id: "Couples Therapy", value: "Couples Therapy", label: "Couples Therapy" }
      ,{  id: "Dance/Movement Therapy (DMT)", value: "Dance/Movement Therapy (DMT)", label: "Dance/Movement Therapy (DMT)" }
      ,{  id: "Dialectical Behavioral Therapy (DBT)", value: "Dialectical Behavioral Therapy (DBT)", label: "Dialectical Behavioral Therapy (DBT)" }
      ,{  id: "Emotionally Focused Couples Therapy", value: "Emotionally Focused Couples Therapy", label: "Emotionally Focused Couples Therapy" }
      ,{  id: "Emotional Freedom Technique (Tapping)", value: "Emotional Freedom Technique (Tapping)", label: "Emotional Freedom Technique (Tapping)" }
      ,{  id: "Existential Therapy", value: "Existential Therapy", label: "Existential Therapy" }
      ,{  id: "Exposure and Response Prevention", value: "Exposure and Response Prevention", label: "Exposure and Response Prevention" }
      ,{  id: "Eye Movement Desensitization and Reprocessing (EMDR)", value: "Eye Movement Desensitization and Reprocessing (EMDR)", label: "Eye Movement Desensitization and Reprocessing (EMDR)" }
      ,{  id: "Gestalt Therapy", value: "Gestalt Therapy", label: "Gestalt Therapy" }
      ,{  id: "Habit Reversal Therapy", value: "Habit Reversal Therapy", label: "Habit Reversal Therapy" }
      ,{  id: "Holistic Therapy", value: "Holistic Therapy", label: "Holistic Therapy" }
      ,{  id: "Internal Family Systems", value: "Internal Family Systems", label: "Internal Family Systems" }
      ,{  id: "Interpersonal Therapy", value: "Interpersonal Therapy", label: "Interpersonal Therapy" }
      ,{  id: "Mindfulness Practices", value: "Mindfulness Practices", label: "Mindfulness Practices" }
      ,{  id: "Mindfulness Based Stress Reduction", value: "Mindfulness Based Stress Reduction", label: "Mindfulness Based Stress Reduction" }
      ,{  id: "Motivational Interviewing", value: "Motivational Interviewing", label: "Motivational Interviewing" }
      ,{  id: "Multicultural Therapy", value: "Multicultural Therapy", label: "Multicultural Therapy" }
      ,{  id: "Narrative Therapy", value: "Narrative Therapy", label: "Narrative Therapy" }
      ,{  id: "Pastoral Counseling", value: "Pastoral Counseling", label: "Pastoral Counseling" }
      ,{  id: "Positive Psychology", value: "Positive Psychology", label: "Positive Psychology" }
      ,{  id: "Psychoanalytic Therapy", value: "Psychoanalytic Therapy", label: "Psychoanalytic Therapy" }
      ,{  id: "Psychodynamic Therapy", value: "Psychodynamic Therapy", label: "Psychodynamic Therapy" }
      ,{  id: "Sex therapy", value: "Sex therapy", label: "Sex therapy" }
      ,{  id: "Solution-focused Therapy", value: "Solution-focused Therapy", label: "Solution-focused Therapy" }
      ,{  id: "Sports psychology", value: "Sports psychology", label: "Sports psychology" }
      ,{  id: "Supportive Therapy", value: "Supportive Therapy", label: "Supportive Therapy" }
      ,{  id: "Yoga", value: "Yoga", label: "Yoga" }
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
      {  id: "Asian/Asian-American therapists", value: "Asian/Asian-American therapists", label: "Asian/Asian-American therapists" }
      ,{  id: "Black/African-American therapists", value: "Black/African-American therapists", label: "Black/African-American therapists" }
      ,{  id: "Latinx therapists", value: "Latinx therapists", label: "Latinx therapists" }
      ,{  id: "LGBTQ+ therapists", value: "LGBTQ therapists", label: "LGBTQ therapists" }
      ,{  id: "Therapists of color", value: "Therapists of color", label: "Therapists of color" }
      ,{  id: "Buddhist therapists", value: "Buddhist therapists", label: "Buddhist therapists" }
      ,{  id: "Christian therapists", value: "Christian therapists", label: "Christian therapists" }
      ,{  id: "Hindu therapists", value: "Hindu therapists", label: "Hindu therapists" }
      ,{  id: "Muslim therapists", value: "Muslim therapists", label: "Muslim therapists" }
      ,{  id: "Jain therapists", value: "Jain therapists", label: "Jain therapists" }
      ,{  id: "Jewish therapists", value: "Jewish therapists", label: "Jewish therapists" }
      ,{  id: "Sikh therapists", value: "Sikh therapists", label: "Sikh therapists" },
      {  id: "Spanish-speaking Therapist", value: "Spanish-speaking Therapist", label: "Spanish-speaking Therapist" }
      ,{  id: "Female therapists", value: "Female therapists", label: "Female therapists" }
      ,{  id: "Male therapists", value: "Male therapists", label: "Male therapists" }
      ,{  id: "Non-binary therapists", value: "Non-binary therapists", label: "Non-binary therapists" }
      
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
          {currPageNum === 1 ? (
            <BackButton path="/getStarted" />
          ) : (
            <BackButton onClick={handlePreviousPage} />
          )}

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
                    <Link to="/results">
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
                <Link to="/results">
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
  )
}
