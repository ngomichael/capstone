import React, { useState } from 'react'
import styles from './Results.module.css'
import ProviderListItem from './ProviderListItem'

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
      <h1>Providers for you</h1>
      <input
        value={searchVal}
        onChange={handleSearchValChange}
        placeholder="Search for a location or keyword"
        className={styles.searchInput}
      />
      <div className={styles.providersContainer}>
        {providers.map(provider => (
          <ProviderListItem provider={provider} />
        ))}
      </div>
    </div>
  )
}

export default Results
