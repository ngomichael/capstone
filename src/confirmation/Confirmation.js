import React, { useState } from 'react'
import { Link, Redirect } from '@reach/router'
import styles from './Confirmation.module.css'

const Confirmation = props => {

    const [clicked, setClicked] = useState(false);

    function handleClick() {
      setClicked(true);
    }

  return (
    <div className={styles.container}>
      { (clicked) ? <Redirect noThrow to='questionnaire'/> : null}
      <div className={styles.text_content}>
        <p className={styles.header}> Welcome to PearCare  {props.displayName}! </p>
        <p> A confirmation email has been sent to  {props.email}.</p>
        <p>
          To get the best therapist pair for your care, we need to learn a little about you.
        </p>
      </div>
      <button type='button' className={styles.button}
      onClick={handleClick} >
      Start questionnaire </button>
      <Link to="/questionnaire"> Skip to a list of providers near me </Link>
    </div>
  )
}

export default Confirmation
