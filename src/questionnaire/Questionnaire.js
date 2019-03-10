import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './Questionnaire.module.css'
import QuestionnaireHeader from './QuestionnaireHeader'

const initialValues = {
  cityOrZip: '',
  // careType: '',
  struggles: [],
  insurances: [],
  // ageGroup: [],
  credentials: [],
  personalityTraits: [],
  clientPopulartion: [],
}

const Questionnaire = props => {
  return (
    <div className={styles.container}>
      <QuestionnaireHeader />
      <div className={styles.questionsContainer}>
        <h1>Questionnaire</h1>
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
              <div>
                {/* TODO: Create component for input field */}
                <p className={styles.question}>
                  What's the city of zipcode you're seeking care in?
                </p>
                <div>
                  <p className={styles.exampleAnswers}>
                    This will help us find providers closest to you
                  </p>
                  <Field name="zipcode" type="text" className={styles.input} />
                </div>
              </div>
              <div>
                <p className={styles.question}>
                  What are you struggling with and seeking help for?
                </p>
                <div>
                  <p className={styles.exampleAnswers}>
                    I.e. depression, life transition challenges
                  </p>
                  <Field
                    name="illnesses"
                    type="text"
                    className={styles.longInput}
                  />
                </div>
              </div>
              <div>
                <p className={styles.question}>
                  What insurance(s) do you have, if any?
                </p>
                <div>
                  <p className={styles.exampleAnswers}>I.e. Apple Health</p>
                  <Field
                    name="insurance"
                    type="text"
                    className={styles.input}
                  />
                </div>
              </div>
              <div>
                <p className={styles.question}>
                  Are you looking for someone with certain credentials?
                </p>
                <div>
                  <p className={styles.exampleAnswers}>I.e. PhD, LICSW</p>
                  <Field
                    name="credentials"
                    type="text"
                    className={styles.input}
                  />
                </div>
              </div>
              <div>
                <p className={styles.question}>
                  Are you looking for someone with certain personality traits or
                  treatment approaches?
                </p>
                <div>
                  <p className={styles.exampleAnswers}>
                    I.e. Integrative, non-directive
                  </p>
                  <Field
                    name="traits"
                    type="text"
                    className={styles.longInput}
                  />
                </div>
              </div>
              <div>
                <p className={styles.question}>
                  Are you looking for someone that specializes in working with a
                  certain client population or shares an identity trait??
                </p>
                <div>
                  <p className={styles.exampleAnswers}>
                    I.e. gender, race/ethnicity, religion/spirituality, sexual
                    orientation, language
                  </p>
                  <Field
                    name="population"
                    type="text"
                    className={styles.longInput}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Questionnaire
