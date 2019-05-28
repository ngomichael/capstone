import React, { useState, useEffect } from 'react'
import styles from './matched-providers.module.css'
import { ProviderCard } from './provider-card'
import { Transition, animated } from 'react-spring/renderprops'
import { UndrawEmpty } from 'react-undraw'
import { OptionButton } from '../common/option-button'
import { Button, TYPES, SIZES } from '../common/button'
import { ChevronDown, Search } from 'react-feather'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import AcceptingClientsIcon from '../icons/accepting-clients.png'
import firebase from '../firebase/firebase'
import { filters, allFilterOptions, allOptionsMap } from '../constants/filters'

export const MatchedProviders = () => {
  const [searchVal, setSearchVal] = useState('')

  const [allProviders, setAllProviders] = useState([])
  const [allCheckedItems, setAllCheckedItems] = useState(new Map())
  const [activeCheckboxContainer, setActiveCheckboxContainer] = useState()
  const [appliedFilters, setAppliedFilters] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [showGrayBackground, setShowGrayBackground] = useState(false)
  const [initialAnimDone, setInitialAnimDone] = useState(false)

  useEffect(() => {
    getProviders()
    window.scrollTo(0, 0)
    // setAllCheckedItems(allOptionsMap)
  }, [])

  // handles updating allCheckedItems with what values are currently checked
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

  function handleClearAllFilters() {
    const newMap = allCheckedItems
    newMap.forEach((value, key, map) => {
      newMap.set(key, false)
    })
    setAllCheckedItems(newMap)
    handleApplyFilter()
  }

  function handleClearFiltersOneType(options) {
    const newMap = allCheckedItems
    options.forEach(option => {
      newMap.set(option, false)
    })
    setAllCheckedItems(newMap)
  }

  // handles applying filter by looking through allChecked Items and apply those filters and updating allProviders
  function handleApplyFilter() {
    let checkedItemsArray = []

    allCheckedItems.forEach((value, key) => {
      value === true && checkedItemsArray.push(key)
    })
    console.log(checkedItemsArray)
    filterProviders(checkedItemsArray)
  }

  // given list of terms to filter providers by
  async function filterProviders(terms) {
    setAppliedFilters(terms)
    console.log(terms)
    const snapshot = await firebase.filterProviders(terms)
    const queriedProvider = snapshot.docs.map(doc => doc.data())
    setAllProviders(queriedProvider)
    setPageCount(Math.ceil(queriedProvider.length / providersPerPage))
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

  function handlePageClick(data) {
    setCurrentPage(data.selected + 1)
    window.scrollTo(0, 0)
  }

  function handleShowGrayBackground(clicked) {
    setShowGrayBackground(clicked)
  }

  const indexOfLastProvider = currentPage * providersPerPage
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage
  const currentProviders = allProviders.slice(
    indexOfFirstProvider,
    indexOfLastProvider
  )

  return (
    <div className={styles.container}>
      <div className={styles.maxWidthContainer}>
        {/* {showGrayBackground && (
          <div
            onClick={() => {
              // setShowGrayBackground(false)
              // setActiveCheckboxContainer(null)
            }}
            className={styles.grayBackground}
          />
        )} */}
        <div className={styles.titleAndSearchContainer}>
          <h1>Providers for you</h1>
          <div className={styles.searchContainer}>
            <Search size={20} className={styles.searchIcon} />
            {/* <input
              value={searchVal}
              onChange={handleSearchValChange}
              placeholder="Search for a location"
              className={styles.searchInput}
            /> */}
            <Select
              className={styles.input}
              defaultValue="blue"
              isClearable={true}
              isSearchable={true}
              name="cities"
              placeholder="City or Zip"
            />
          </div>
        </div>

        <div className={styles.filtersContainer}>
          {filters.map(filter => (
            <OptionButton
              key={filter.id}
              allCheckedItems={allCheckedItems}
              options={filter.options}
              handleCheckboxChangeMatchedProviders={handleCheckboxChange}
              changeActiveCheckboxContainer={() =>
                setActiveCheckboxContainer(filter.id)
              }
              onApplyFilter={handleApplyFilter}
              handleClearFiltersOneType={handleClearFiltersOneType}
              handleShowGrayBackground={handleShowGrayBackground}
              id={filter.id}
              activeCheckboxContainer={activeCheckboxContainer}
            >
              {filter.name}
              <ChevronDown
                color="hsl(174, 47%, 75%)"
                className={styles.chevronDown}
              />
            </OptionButton>
          ))}
          {appliedFilters.length !== 0 && (
            <button
              onClick={handleClearAllFilters}
              className={styles.clearAllButton}
            >
              Clear all filters
            </button>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              fontWeight: '400',
              color: 'hsl(228, 14%, 58%)',
              marginTop: '25px',
            }}
          >
            {`${currentProviders.length} of ${allProviders.length} results`}
          </span>
          <div className={styles.iconKey}>
            <img
              src={AcceptingClientsIcon}
              className={styles.acceptingClientsIcon}
            />
            <span>&mdash;</span>
            <span style={{ marginLeft: '7px' }}> Accepting new clients</span>
          </div>
        </div>

        {currentProviders.length !== 0 ? (
          <div className={styles.providersContainer}>
            <Transition
              items={currentProviders}
              keys={item => item.id}
              initial={{
                height: 'auto',
                transform: 'translateX(-50px)',
                opacity: '0',
              }}
              trail={initialAnimDone ? 0 : 150}
              onRest={() => setInitialAnimDone(true)}
              from={{
                transform: 'translateX(0px)',
                opacity: '0',
                height: 0,
              }}
              enter={{
                transform: 'translateX(0px)',

                height: 'auto',
                opacity: '1',
              }}
              leave={{ opacity: 0, height: 0 }}
            >
              {item => props => (
                <animated.div style={props}>
                  <ProviderCard provider={item} />
                </animated.div>
              )}
            </Transition>
          </div>
        ) : (
          <div className={styles.noProviders}>
            <UndrawEmpty primaryColor="hsl(174, 74%, 39%)" />
            <p className={styles.noProvidersText}>
              No providers found, please try again with new filters
            </p>
          </div>
        )}

        {currentProviders.length !== 0 && (
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
            activeClassName={styles.activeLink}
            disabledClassName={styles.disabledClassName}
          />
        )}

        {/* <div>
          <button type="button" onClick={() => firebase.signOut()}>
            Sign Out
          </button>
        </div> */}
      </div>
    </div>
  )
}
