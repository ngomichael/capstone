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
    name: 'Depression, Anxiety',
    isClicked: true,
  },
  {
    name: 'Therapy',
    isClicked: true,
  },
  {
    name: 'Aetna',
    isClicked: true,
  },
  {
    name: 'Young Adult',
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

export const MatchedProviders = () => {
  const [searchVal, setSearchVal] = useState('')
  const [allProviders, setAllProviders] = useState([])
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {
    getProviders()
    getByName('Brian Pendergast')
    // filter('care_types', 'Therapist')
    filterProviders(['Depression'])
  }, [])

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
            <OptionButton isClicked={filter.isClicked} key={filter.name}>
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
        <Pagination
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
        </div>
        <div style={{ marginBottom: '35px' }} />
      </div>
    </div>
  )
}
