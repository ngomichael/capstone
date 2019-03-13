import React, { useState } from 'react'
import styles from './Results.module.css'
import ProviderListItem from './ProviderListItem'
import QuestionnaireHeader from '../questionnaire/QuestionnaireHeader'

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

const Results = () => {
  const [searchVal, setSearchVal] = useState('')
  function handleSearchValChange(e) {
    setSearchVal(e.target.value)
  }
  return (
    <div className={styles.container}>
      <QuestionnaireHeader step={3} />
      <div className={styles.titleAndSearchContainer}>
        <h1>Providers for you</h1>
        <input
          value={searchVal}
          onChange={handleSearchValChange}
          placeholder="Search for a location or keyword"
          className={styles.searchInput}
        />
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
