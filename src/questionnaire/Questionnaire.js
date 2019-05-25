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
    question: 'What kind of care are you looking for?',
    supplementaryText:
      'Getting to a provider can be a big barrier in receiving care. This information helps us find providers close to you.',
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
    ],
    name: 'care_types',
    pageNum: 1,
  },
  {
    questionType: 'autocomplete',
    question:
      'What are you struggling with and seeking help for? (I.e depression, life transition challenges)',
    supplementaryText:
      "Providers often have different areas of expertise. Having a provider who has experience with what you're struggling with could enhance the quality of your care.",
    terms: [
      { id: 'ADHD', value: 'ADHD', label: 'ADHD' },
      {
        id: 'Addiction (Substance, Gambling, Sex, etc.)',
        value: 'Addiction (Substance, Gambling, Sex, etc.)',
        label: 'Addiction (Substance, Gambling, Sex, etc.)',
      },
      {
        id: 'Adoption',
        value: 'Adoption',
        label: 'Adoption',
      },
      {
        id: 'Alzheimer’s',
        value: 'Alzheimer’s',
        label: 'Alzheimer’s',
      },
      {
        id: 'Anger management',
        value: 'Anger management',
        label: 'Anger management',
      },
      {
        id: 'Antisocial Personality',
        value: 'Antisocial Personality',
        label: 'Antisocial Personality',
      },
      { id: 'Anxiety', value: 'Anxiety', label: 'Anxiety' },
      {
        id: 'Asperger’s',
        value: 'Asperger’s',
        label: 'Asperger’s',
      },
      { id: 'Autism', value: 'Autism', label: 'Autism' },
      {
        id: 'Behavioral issues',
        value: 'Behavioral issues',
        label: 'Behavioral issues',
      },
      { id: 'Bipolar', value: 'Bipolar', label: 'Bipolar' },
      { id: 'Body Image', value: 'Body Image', label: 'Body Image' },
      {
        id: 'Borderline personality',
        value: 'Borderline personality',
        label: 'Borderline personality',
      },
      {
        id: 'Chronic illness/pain',
        value: 'Chronic illness/pain',
        label: 'Chronic illness/pain',
      },
      { id: 'Codependency', value: 'Codependency', label: 'Codependency' },
      { id: 'Depression', value: 'Depression', label: 'Depression' },
      {
        id: 'Developmental Disorders',
        value: 'Developmental Disorders',
        label: 'Developmental Disorders',
      },
      { id: 'Divorce', value: 'Divorce', label: 'Divorce' },
      {
        id: 'Dual diagnosis',
        value: 'Dual diagnosis',
        label: 'Dual diagnosis',
      },
      {
        id: 'Eating disorders',
        value: 'Eating disorders',
        label: 'Eating disorders',
      },
      {
        id: 'Emotional disturbance',
        value: 'Emotional disturbance',
        label: 'Emotional disturbance',
      },
      {
        id: 'Family conflict',
        value: 'Family conflict',
        label: 'Family conflict',
      },
      { id: 'Grief', value: 'Grief', label: 'Grief' },
      { id: 'Hoarding', value: 'Hoarding', label: 'Hoarding' },
      {
        id: 'Identity development',
        value: 'Identity development',
        label: 'Identity development',
      },
      { id: 'Infertility', value: 'Infertility', label: 'Infertility' },
      { id: 'Infidelity', value: 'Infidelity', label: 'Infidelity' },
      {
        id: 'Intellectual disabilities',
        value: 'Intellectual disabilities',
        label: 'Intellectual disabilities',
      },
      {
        id: 'Learning disabilities',
        value: 'Learning disabilities',
        label: 'Learning disabilities',
      },
      { id: 'Life coaching', value: 'Life coaching', label: 'Life coaching' },
      {
        id: 'Life transitions',
        value: 'Life transitions',
        label: 'Life transitions',
      },
      { id: 'Medical detox', value: 'Medical detox', label: 'Medical detox' },
      {
        id: 'Narcissistic personality',
        value: 'Narcissistic personality',
        label: 'Narcissistic personality',
      },
      {
        id: 'Obsessive-compulsive (OCD)',
        value: 'Obsessive-compulsive (OCD)',
        label: 'Obsessive-compulsive (OCD)',
      },
      {
        id: 'Oppositional-defiant (ODD)',
        value: 'Oppositional-defiant (ODD)',
        label: 'Oppositional-defiant (ODD)',
      },
      { id: 'Parenting', value: 'Parenting', label: 'Parenting' },
      {
        id: 'Pregnancy, Prenatal, Postpartum',
        value: 'Pregnancy, Prenatal, Postpartum',
        label: 'Pregnancy, Prenatal, Postpartum',
      },
      { id: 'PTSD', value: 'PTSD', label: 'PTSD' },
      {
        id: 'Racial Identity',
        value: 'Racial Identity',
        label: 'Racial Identity',
      },
      {
        id: 'Relationship issues',
        value: 'Relationship issues',
        label: 'Relationship issues',
      },
      { id: 'School issues', value: 'School issues', label: 'School issues' },
      { id: 'Self esteem', value: 'Self esteem', label: 'Self esteem' },
      { id: 'Self harming', value: 'Self harming', label: 'Self harming' },
      {
        id: 'Sleep or insomnia issues',
        value: 'Sleep or insomnia issues',
        label: 'Sleep or insomnia issues',
      },
      { id: 'Spirituality', value: 'Spirituality', label: 'Spirituality' },
      {
        id: 'Sports Performance',
        value: 'Sports Performance',
        label: 'Sports Performance',
      },
      { id: 'Stress', value: 'Stress', label: 'Stress' },
      {
        id: 'Substance abuse',
        value: 'Substance abuse',
        label: 'Substance abuse',
      },
      { id: 'Trauma', value: 'Trauma', label: 'Trauma' },
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
      { id: 'Aetna', value: 'Aetna', label: 'Aetna' },
      {
        id: 'Anthem',
        value: 'Anthem',
        label: 'Anthem',
      },
      {
        id: 'Apple Health',
        value: 'Apple Health',
        label: 'Apple Health',
      },
      { id: 'Asuris', value: 'Asuris', label: 'Asuris' },
      {
        id: 'Blue Cross Blue Shield',
        value: 'Blue Cross Blue Shield',
        label: 'Blue Cross Blue Shield',
      },
      { id: 'BridgeSpan', value: 'BridgeSpan', label: 'BridgeSpan' },
      { id: 'Cambia', value: 'Cambia', label: 'Cambia' },
      {
        id: 'Carefirst',
        value: 'Carefirst',
        label: 'Carefirst',
      },
      {
        id: 'Centene',
        value: 'Centene',
        label: 'Centene',
      },
      {
        id: 'Cigna',
        value: 'Cigna',
        label: 'Cigna',
      },
      {
        id: 'Community Health Plan of Washington',
        value: 'Community Health Plan of Washington',
        label: 'Community Health Plan of Washington',
      },
      {
        id: 'Coordinated Care',
        value: 'Coordinated Care',
        label: 'Coordinated Care',
      },
      {
        id: 'Coventry',
        value: 'Coventry',
        label: 'Coventry',
      },
      {
        id: 'HCSC',
        value: 'HCSC',
        label: 'HCSC',
      },
      {
        id: 'Health Alliance',
        value: 'Health Alliance',
        label: 'Health Alliance',
      },
      {
        id: 'Highmark',
        value: 'Highmark',
        label: 'Highmark',
      },
      {
        id: 'HIP',
        value: 'HIP',
        label: 'HIP',
      },
      {
        id: 'Humana',
        value: 'Humana',
        label: 'Humana',
      },
      {
        id: 'Independent Blue Cross',
        value: 'Independent Blue Cross',
        label: 'Independent Blue Cross',
      },
      {
        id: 'ISHIP',
        value: 'ISHIP',
        label: 'ISHIP',
      },
      {
        id: 'Kaiser Foundation Health Plan of Washington',
        value: 'Kaiser Foundation Health Plan of Washington',
        label: 'Kaiser Foundation Health Plan of Washington',
      },
      {
        id: 'Kaiser Permanente',
        value: 'Kaiser Permanente',
        label: 'Kaiser Permanente',
      },
      {
        id: 'Lifetime',
        value: 'Lifetime',
        label: 'Lifetime',
      },
      {
        id: 'LifeWise',
        value: 'LifeWise',
        label: 'LifeWise',
      },
      {
        id: 'Medicaid',
        value: 'Medicaid',
        label: 'Medicaid',
      },
      {
        id: 'Medicare',
        value: 'Medicare',
        label: 'Medicare',
      },
      {
        id: 'Metropolitan',
        value: 'Metropolitan',
        label: 'Metropolitan',
      },
      {
        id: 'Molina',
        value: 'Molina',
        label: 'Molina',
      },
      {
        id: 'Premera Blue Cross',
        value: 'Premera Blue Cross',
        label: 'Premera Blue Cross',
      },
      {
        id: 'Regence BlueShield',
        value: 'Regence BlueShield',
        label: 'Regence BlueShield',
      },
      {
        id: 'United',
        value: 'United',
        label: 'United',
      },
      {
        id: 'Wellcare',
        value: 'Wellcare',
        label: 'Wellcare',
      },
      {
        id: 'Wellpoint',
        value: 'Wellpoint',
        label: 'Wellpoint',
      },
      {
        id: 'Other',
        value: 'Other',
        label: 'Other',
      },
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
    pageNum: 2,
  },
  {
    questionType: 'autocomplete',
    question:
      'Are you looking for someone with certain credentials? (I.e. PhD, LICSW)',
    supplementaryText:
      'Some patients prefer their providers have completed a certain degree or certificate program.',
    terms: [
      {
        id: 'AAPC (Association of Pastoral Counselors)',
        value: 'AAPC (Association of Pastoral Counselors)',
        label: 'AAPC (Association of Pastoral Counselors)',
      },
      {
        id: 'ACSW (Academy of Certified Social Worker)',
        value: 'ACSW (Academy of Certified Social Worker)',
        label: 'ACSW (Academy of Certified Social Worker)',
      },
      {
        id: 'DO (Doctor of Osteopathic Medicine)',
        value: 'DO (Doctor of Osteopathic Medicine)',
        label: 'DO (Doctor of Osteopathic Medicine)',
      },
      {
        id: 'FNP-BC (Family Nurse Practitioner Board Certified)',
        value: 'FNP-BC (Family Nurse Practitioner Board Certified)',
        label: 'FNP-BC (Family Nurse Practitioner Board Certified)',
      },
      {
        id: 'LCSW, Licensed Clinical Social Worker',
        value: 'LCSW, Licensed Clinical Social Worker',
        label: 'LCSW, Licensed Clinical Social Worker',
      },
      {
        id: 'LICSW, Licensed Independent Social Workers',
        value: 'LICSW, Licensed Independent Social Workers',
        label: 'LICSW, Licensed Independent Social Workers',
      },
      {
        id: 'LMFT, Licensed Marriage and Family Therapist',
        value: 'LMFT, Licensed Marriage and Family Therapist',
        label: 'LMFT, Licensed Marriage and Family Therapist',
      },
      {
        id: 'LPC (Licensed Professional Counselor)',
        value: 'LPC (Licensed Professional Counselor)',
        label: 'LPC (Licensed Professional Counselor)',
      },
      {
        id: 'MD (Doctor of Medicine)',
        value: 'MD (Doctor of Medicine)',
        label: 'MD (Doctor of Medicine)',
      },
      {
        id: 'M.S./M.A. (Master’s degree)',
        value: 'M.S./M.A. (Master’s degree)',
        label: 'M.S./M.A. (Master’s degree)',
      },
      {
        id: 'MSW (Master’s degree in social work)',
        value: 'MSW (Master’s degree in social work)',
        label: 'MSW (Master’s degree in social work)',
      },
      {
        id: 'NCLEX (National Council Licensure Examination)',
        value: 'NCLEX (National Council Licensure Examination)',
        label: 'NCLEX (National Council Licensure Examination)',
      },
      {
        id: 'Ph.D. (Doctor of Philosophy)',
        value: 'Ph.D. (Doctor of Philosophy)',
        label: 'Ph.D. (Doctor of Philosophy)',
      },
      {
        id: 'PharmD (Doctor of Pharmacy)',
        value: 'PharmD (Doctor of Pharmacy)',
        label: 'PharmD (Doctor of Pharmacy)',
      },
      {
        id: 'PMHNP-BC (Board Certification in psychiatric nursing)',
        value: 'PMHNP-BC (Board Certification in psychiatric nursing)',
        label: 'PMHNP-BC (Board Certification in psychiatric nursing)',
      },
      {
        id: 'Ph.D. (Doctor of Philosophy)',
        value: 'Ph.D. (Doctor of Philosophy)',
        label: 'Ph.D. (Doctor of Philosophy)',
      },
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
    pageNum: 2,
  },
  {
    questionType: 'autocomplete',
    question:
      'Are you looking for someone that specializes in working with a certain client population or shares an identity trait? (I.e gender, race/ethnicity, religion/spirituality, sexual orientation, language)',
    supplementaryText:
      'Providers may have more experience with certain groups of the general population. Having a provider who has experience with challenges faced by particular demographics could enhance the quality of your care.',
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
    pageNum: 2,
  },
]

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
    await firebase.addUserQuestionnaireAnswers(answers)
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
          {currPageNum === 1 && (
            <p className={styles.questionnaireDescription}>
              Excluding the first question, all questions are optional and you
              are able to select multiple answers if it better reflects the
              experiences you are going through. If you don't know how to answer
              a question or if it does not apply, please just leave the input
              blank.
            </p>
          )}
          <Formik
            initialValues={{
              zip_code: '',
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
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                {renderQuestions(setFieldValue, currPageNum)}
                {currPageNum === 2 && (
                  <div className={styles.submitButton}>
                    <Button
                      type="submit"
                      buttonType={TYPES.PRIMARY}
                      buttonSize={SIZES.MEDIUM}
                      disabled={
                        values.zip_code.length === 0 ? 'disabled' : false
                      }
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
