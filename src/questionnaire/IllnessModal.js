import React, { useState } from 'react'
import styles from './IllnessModal.module.css'
import Card from './Card'
import OptionButton from './OptionButton'
import { Link } from '@reach/router'

const illnesses = [
  'Depression',
  'Anxiety',
  'Bipolar',
  'Life transition challenges',
  'Stress',
  'Anxiety',
  'Anxiety',
  'Anxiety',
]

const IllnessModal = props => {
  const [searchValue, setSearchValue] = useState('')

  function handleFirstValueChange(e) {
    setSearchValue(e.target.value)
  }
  console.log(searchValue)
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Questionnaire</h1>
        <div className={styles.supportingTextContainer}>
          <p className={styles.subtext}>
            What type of provider are you looking for?
          </p>
          <Link to="/">
            <p className={styles.skipQuestion}>
              Not sure? Skip to the next question
            </p>
          </Link>
        </div>
        <div className={styles.searchIllnessContainer}>
          <div>
            <input
              className={styles.input}
              input={searchValue}
              onChange={handleFirstValueChange}
              placeholder="e.g. PTSD"
            />
            <OptionButton>Search</OptionButton>
          </div>
          <div className={styles.illnessSections}>
            <p className={styles.illnessSectionName}>Most Common</p>
            <div className={styles.illnesses}>
              {illnesses.map(illness => (
                <OptionButton>{illness}</OptionButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IllnessModal
