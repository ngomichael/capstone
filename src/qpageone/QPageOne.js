import React, { useState } from 'react'
import { Link } from '@reach/router'
import styles from './QPageOne.module.css'



const QPageOne = props => {

  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
  }
  

  return (
    <div className={styles.container}>
      { (clicked) ? <Redirect noThrow to='nextPage'/> : null}
      <div className={styles.text_content}>
        <p className={styles.header}> Questionnaire {props.displayName}! </p>
        <p> What type of provider are you looking for?</p>
        <Link to="/"> Not sure? Skip to next question </Link>
      </div>
      <button type='button' className={styles.button} onClick={handleClick}> Start questionnaire </button>
      <Link to="/"> Skip to a list of providers near me </Link>
    </div>
  )
}

export default QPageOne