import React, { useState } from 'react'
import styles from './Results.module.css'
import ProviderListItem from './ProviderListItem'
import QuestionnaireHeader from '../questionnaire/QuestionnaireHeader'
import OptionButton from '../common/OptionButton'
import MorganMcCreaPhoto from '../images/morganmccrea.jpeg'
import Therapist1 from '../images/Therapist1.jpeg'
import Therapist2 from '../images/Therapist2.jpeg'
import JenAdamsPhoto from '../images/Jen+Adams.jpeg'
import { Button, TYPES, SIZES } from '../common/Button'

const providers = [
  {
    name: 'Stacy Adams',
    photo: JenAdamsPhoto,
    specialization: 'ARNP, PMHNP-BC',
    summary:
      '"We will work together to understand what is working in your life through an evaluation and proceed to therapy when desired,"',
  },
  {
    name: 'Regina Aiko',
    photo: Therapist1,
    specialization: 'LICSW',
    summary:
      '"We will go into the depth of your mind and try to originate the feelings you have today and why you have those feelings and thoughts."',
  },
  {
    name: 'Glen Coco',
    photo: Therapist2,
    specialization: 'PsyD',
    summary:
      '"I will guid you to the right direction with a personalized diagnoses. We will always understand what you are struggling with and how you want to seek solutions."',
  },
]

const filters = [
  {
    name: 'Depression, anxiety',
    isClicked: true,
  },
  {
    name: 'Therapy',
    isClicked: true,
  },
  {
    name: 'Apple Health',
    isClicked: true,
  },
  {
    name: 'Young adult',
    isClicked: true,
  },
  {
    name: 'Credentials',
    isClicked: false,
  },
  {
    name: 'Approach',
    isClicked: false,
  },
  {
    name: 'Personality',
    isClicked: false,
  },
  {
    name: 'Identity/Population',
    isClicked: false,
  },
]

const Results = () => {
  const [searchVal, setSearchVal] = useState('')
  const [isOpen, setIsOpen] = useState(true)

  function handleSearchValChange(e) {
    setSearchVal(e.target.value)
  }

  function handleClose() {
    setIsOpen(false)
  }
  return (
    <div className={styles.container}>
      <QuestionnaireHeader step={2} />
      {isOpen && (
        <div className={styles.alertContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.closeButton}
            onClick={handleClose}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>

          <h1 className={styles.alertHeader}>
            Here are providers you might like. View their pages to find out the
            best ways to contact them
          </h1>
          <p>
            Below are a list of providers curated to fit your needs. Read their
            bios to get to know them better, favorite them for to save later,
            and adjust filters if needed. Once you feel that you found a
            provider you want to work with, contact them via the phone, email,
            or intake form they specified in their bio.
          </p>
        </div>
      )}
      <div className={styles.titleAndSearchContainer}>
        <h1>Providers for you</h1>
        <input
          value={searchVal}
          onChange={handleSearchValChange}
          placeholder="Search for a location or keyword"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.filtersContainer}>
        {filters.map(filter => (
          <OptionButton isClicked={filter.isClicked}>
            {filter.name}
          </OptionButton>
        ))}
      </div>
      <div className={styles.providersContainer}>
        {providers.map(provider => (
          <ProviderListItem provider={provider} />
        ))}
      </div>
      <p className={styles.pageInfo}>1-3 of 18 results</p>
      <Button
        type="button"
        buttonType={TYPES.PRIMARY}
        buttonSize={SIZES.MEDIUM}
      >
        View more matches
      </Button>
    </div>
  )
}

export default Results
