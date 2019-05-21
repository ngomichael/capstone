import React, { useState, useEffect } from 'react'
import styles from './matched-providers.module.css'
import { ProviderCard } from './provider-card'
import { OnboardingHeader } from '../common/onboarding-header'
import { UndrawEmpty } from 'react-undraw'
import { OptionButton } from '../common/option-button'
import { Button, TYPES, SIZES } from '../common/button'
import ReactPaginate from 'react-paginate'
import firebase from '../firebase/firebase'

const filters = [
  {
    id: 1,
    name: 'Issues',
    options: [
      'Anxiety',
      'Anger Management',
      'Depression',
      'Life Transition Challenges',
      'Relationship Issues',
      'Eating Disorders',
    ],
  },
  {
    id: 2,
    name: 'Care Type',
    options: ['Therapist', 'Medication', 'Testing'],
  },
  {
    id: 3,
    name: 'Insurance',
    options: [
      'Aetna',
      'Beacon Health Options',
      'Blue Cross Blue Shield',
      'Harvard Pilgrim Health',
      'Medicare',
    ],
  },
  {
    id: 4,
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
    id: 5,
    name: 'Credentials',
    options: [
      'Psychiatrist (MD, Doctor)',
      'Social Worker (MSW, LGSW, LCSW, LMSW)',
      'Pastoral Counseling (MA, CCPT, CpastC)',
      ' Pastoral Counseling (MA, CCPT, CpastC, NCPC, NCCA)',
    ],
  },
  {
    id: 6,
    name: 'Approach',
    options: ['Integrative', 'Non-Directive', 'Career counseling'],
  },
  {
    id: 7,
    name: 'Identity/Population',
    options: [
      'Asian/Asian-American therapists',
      'Black/African-American therapists',
      'Latinx therapists',
      'LGBTQ+ therapists',
    ],
  },
]

export const MatchedProviders = () => {
  const [searchVal, setSearchVal] = useState('')
  const [allProviders, setAllProviders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [allCheckedItems, setAllCheckedItems] = useState(new Map())
  const [activeCheckboxContainer, setActiveCheckboxContainer] = useState()

  useEffect(() => {
    getProviders()
  }, [])

  function handleCheckboxChange(e) {
    const item = e.target.name
    const isChecked = e.target.checked
    const newMap = new Map([...allCheckedItems.set(item, isChecked)])
    setAllCheckedItems(newMap)
    let checkedItemsArray = []

    allCheckedItems.forEach((value, key) => {
      value === true && checkedItemsArray.push(key)
    })
  }

  function handleApplyFilter() {
    let checkedItemsArray = []

    allCheckedItems.forEach((value, key) => {
      value === true && checkedItemsArray.push(key)
    })
    filterProviders(checkedItemsArray)
  }

  function handleSearchValChange(e) {
    setSearchVal(e.target.value)
  }

  const providersPerPage = 4

  async function getProviders() {
    const snapshot = await firebase.getAllProviders()
    setAllProviders(snapshot.docs.map(doc => doc.data()))
    setPageCount(Math.ceil(snapshot.docs.map(doc => doc.data()).length / 4))
  }

  async function filterProviders(terms) {
    console.log(terms)
    const snapshot = await firebase.filterProviders(terms)
    const queriedProvider = snapshot.docs.map(doc => doc.data())
    console.log(queriedProvider)
    setAllProviders(queriedProvider)
    console.log(queriedProvider)
    setPageCount(Math.ceil(queriedProvider.length / providersPerPage))
  }

  function handlePageClick(data) {
    // console.log(data)
    console.log(`active page is ${data.selected}`)
    setCurrentPage(data.selected + 1)
    console.log(pageCount)
  }

  const indexOfLastProvider = currentPage * providersPerPage
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage
  const currentProviders = allProviders.slice(
    indexOfFirstProvider,
    indexOfLastProvider
  )

  // console.log(allProviders)
  console.log(currentPage)

  return (
    <div className={styles.container}>
      <OnboardingHeader step={2} />
      <div className={styles.maxWidthContainer}>
        <div className={styles.titleAndSearchContainer}>
          <h1>Providers for you</h1>
          {/* <input
            value={searchVal}
            onChange={handleSearchValChange}
            placeholder="Search for a location or keyword"
            className={styles.searchInput}
          /> */}
        </div>

        <div className={styles.filtersContainer}>
          {filters.map(filter => (
            <OptionButton
              key={filter.id}
              options={filter.options}
              onChange={handleCheckboxChange}
              onClick={() => setActiveCheckboxContainer(filter.id)}
              onApplyFilter={handleApplyFilter}
              allCheckedItems={allCheckedItems}
              id={filter.id}
              activeCheckboxContainer={activeCheckboxContainer}
            >
              {filter.name}
            </OptionButton>
          ))}
        </div>

        {allProviders.length !== 0 ? (
          <div className={styles.providersContainer}>
            {currentProviders.map(provider => (
              <ProviderCard provider={provider} key={provider.name} />
            ))}
          </div>
        ) : (
          <div className={styles.noProviders}>
            <UndrawEmpty primaryColor="hsl(174, 74%, 39%)" />
            <p className={styles.noProvidersText}>No providers found...</p>
          </div>
        )}

        <ReactPaginate
          previousLabel={'< Back'}
          nextLabel={'Next >'}
          breakLabel={'...'}
          // breakClassName={'break-me'}
          pageCount={pageCount}
          // marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          previousClassName={styles.paginationButton}
          nextClassName={styles.paginationButton}
          previousLinkClassName={styles.paginationLinkButton}
          nextLinkClassName={styles.paginationLinkButton}
          pageClassName={styles.pageClassName}
          pageLinkClassName={styles.pageLinkClassName}
          // subContainerClassName={'pages pagination'}
          activeClassName={styles.activeLink}
        />

        {/* <p className={styles.pageInfo}>1-3 of 18 results</p>
        <Button
          type="button"
          buttonType={TYPES.PRIMARY}
          buttonSize={SIZES.MEDIUM}
        >
          View more matches
        </Button> */}

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
