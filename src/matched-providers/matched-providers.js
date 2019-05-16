import React, { useState, useEffect } from 'react'
import styles from './matched-providers.module.css'
import { ProviderCard } from './provider-card'
import { OnboardingHeader } from '../common/onboarding-header'
import { OptionButton } from '../common/option-button'
import { Button, TYPES, SIZES } from '../common/button'
import Pagination from 'react-js-pagination'
import firebase from '../firebase/firebase'

const filters = [
  {
    name: 'Issues',
    options: [
      'Depression',
      'Anxiety',
      'Anger Management',
      'Life Transition Challenges',
    ],
  },
  {
    name: 'Care Type',
    options: ['Therapist', 'Medication', 'Testing'],
  },
  {
    name: 'Insurance',
    options: ['Aetna', 'Blue Cross Blue Shield', 'Medicare'],
  },
  {
    name: 'Age Group',
    options: [
      'Toddlers/preschoolers (ages 0 to 6)',
      'Children (ages 6 to 10)',
      'Preteens/tweens (ages 11 to 13)',
      'Adolescents (ages 14 to 19)',
      'Young Adults',
      'Adults',
    ],
  },
  {
    name: 'Credentials',
    options: ['PhD', 'MD', 'LGPC'],
  },
  {
    name: 'Approach',
    options: ['Integrative', 'Non-Directive'],
  },
  {
    name: 'Identity/Population',
    options: [
      'Asian/Asian-American therapists',
      'Black/African-American therapists',
      'Latinx therapists',
    ],
  },
]

export const MatchedProviders = () => {
  const [searchVal, setSearchVal] = useState('')
  const [allProviders, setAllProviders] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [checkedItems, setCheckedItems] = useState(new Map())

  useEffect(() => {
    getProviders()
    getByName('Brian Pendergast')
  }, [])

  function handleCheckboxChange(item, isChecked) {
    const newMap = new Map([...checkedItems.set(item, isChecked)])
    setCheckedItems(newMap)
    let checkedItemsArray = []

    checkedItems.forEach((value, key) => {
      value === true && checkedItemsArray.push(key)
    })
    console.log(checkedItemsArray)
    filterProviders(checkedItemsArray)
  }

  function handleSearchValChange(e) {
    setSearchVal(e.target.value)
  }

  async function getProviders() {
    const snapshot = await firebase.getAllProviders()
    setAllProviders(snapshot.docs.map(doc => doc.data()))
  }

  async function getByName(name) {
    const snapshot = await firebase.filterProviderName(name)
    const queriedProvider = snapshot.docs.map(doc => doc.data())
  }

  async function filterProviders(terms) {
    const snapshot = await firebase.filterProviders(terms)
    const queriedProvider = snapshot.docs.map(doc => doc.data())
    setAllProviders(queriedProvider)
    console.log(queriedProvider)
  }

  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`)
    setActivePage(pageNumber)
  }

  return (
    <div className={styles.container}>
      <OnboardingHeader step={2} />
      <div className={styles.maxWidthContainer}>
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
            <OptionButton
              key={filter.name}
              options={filter.options}
              onChange={handleCheckboxChange}
              checkedItems={checkedItems}
            >
              {filter.name}
            </OptionButton>
          ))}
        </div>

        <div className={styles.providersContainer}>
          {allProviders.map(provider => (
            <ProviderCard provider={provider} key={provider.name} />
          ))}
        </div>
        {/* <p className={styles.pageInfo}>1-3 of 18 results</p>
        <Button
          type="button"
          buttonType={TYPES.PRIMARY}
          buttonSize={SIZES.MEDIUM}
        >
          View more matches
        </Button> */}
        {/* <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={45}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          innerClass={styles.pagination}
          activeLinkClass={styles.activeLink}
        />
        <div>
          <button type="button" onClick={() => firebase.signOut()}>
            Sign Out
          </button>
        </div> */}
        <div style={{ marginBottom: '35px' }} />
      </div>
    </div>
  )
}
