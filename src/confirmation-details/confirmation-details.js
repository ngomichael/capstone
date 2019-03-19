import React from 'react'
import { Link } from '@reach/router'
import styles from './confirmation-details.module.css'
import QuestionnaireHeader from '../questionnaire/questionnaire-header'
import pears from '../images/pairOfPears.png'
import { Button, TYPES, SIZES } from '../common/button'

const ConfirmationDetails = props => {
  return (
    <div className={styles.container}>
      <QuestionnaireHeader step={props.step} />

      <div className={styles.mainContentContainer}>
        <div>
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
          <img src={pears} className={styles.pearImage} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{props.title}</h1>
          <p className={styles.p1}>{props.p1}</p>
          <p className={styles.p2}>{props.p2}</p>
          <Link to={props.to}>
            <Button
              type="button"
              buttonType={TYPES.PRIMARY}
              buttonSize={SIZES.MEDIUM}
            >
              {props.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDetails
