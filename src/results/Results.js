import React, { useState } from 'react'
import styles from './Results.module.css'
import ProviderListItem from './ProviderListItem'
import QuestionnaireHeader from '../questionnaire/QuestionnaireHeader'
import Button from '../common/Button'

const providers = [
  {
    name: 'John Doe',
    specialization: 'Specialization',
    summary:
      '"I specialize in the areas of depression and axiety. I like to help my clients analyze their past behavior, set goals, and work towards them  areas of depression and axiety. I like to help my clients analyze their past behavior, set goals, and work towards them"',
  },
  {
    name: 'John Doe',
    specialization: 'Specialization',
    summary:
      '"I specialize in the areas of depression and axiety. I like to help my clients analyze their past behavior, set goals, and work towards them  areas of depression and axiety. I like to help my clients analyze their past behavior, set goals, and work towards them"',
  },
  {
    name: 'John Doe',
    specialization: 'Specialization',
    summary:
      '"I specialize in the areas of depression and axiety. I like to help my clients analyze their past behavior, set goals, and work towards them  areas of depression and axiety. I like to help my clients analyze their past behavior, set goals, and work towards them"',
  },
]

const filters = [
  {
    name: 'Therapy, Depression, anxiety',
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
      <QuestionnaireHeader step={3} />
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
            You can make an account and favorite providers to save for later,
            and adjust filters if needed. Once you feel that you found a
            provider you want to work with, we'll help you contact them.
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
          <Button isClicked={filter.isClicked}>{filter.name}</Button>
        ))}
      </div>
      <div className={styles.providersContainer}>
        {providers.map(provider => (
          <ProviderListItem provider={provider} />
        ))}
      </div>
      <p className={styles.pageInfo}>1-3 of 18 results</p>
      <button className={styles.viewMoreButton}>View more matches</button>
    </div>
  )
}

export default Results
