import React, { useState } from 'react'
import { Link } from '@reach/router'
import styles from './Confirmation.module.css'

const Confirmation = props => {
  return (
    <div className={styles.container}>
      <div className={styles.text_content}>
        <p className={styles.header}> Welcome to PearCare  {props.displayName}! </p>
        <p> A confirmation email has been sent to  {props.email}.</p>
        <p>
          To get the best therapist pair for your care, we need to learn a little about you.
        </p>
      </div>
      <button className={styles.button}> Start questionnaire </button>
      <Link to="/"> Skip to a list of providers near me </Link>
    </div>
  )
}

export default Confirmation
