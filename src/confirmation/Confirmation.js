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
      <div className={styles.image}>
       <p> Image Placeholder </p>
        </div>
      <div className={styles.content}>
      <div className={styles.text_content}>
        <p className={styles.header}> Congrats {props.displayName}, you created an account! </p>
        <p>You should receive a confirmation email shortly at your email address, {props.email}.  
         learn more about who you are and why you're here so we can find providers that best fit your needs.Lets</p>
        <p>
          All you have to do is answer some quick questions!
        </p>
      </div>
      <div className={styles.buttonwrap}>
      <button type='button' className={styles.button}
      onClick={handleClick} >
      Start questionnaire </button>
      </div>
      <div className={styles.link}> Don't have time right now? <Link to="/questionnaire"> Skip to dashboard </Link></div>
      </div>
    </div>
  )
}

export default Confirmation
