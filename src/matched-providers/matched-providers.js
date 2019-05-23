import React, { useState, useEffect } from 'react'
import styles from './matched-providers.module.css'
import { ProviderCard } from './provider-card'
import { OnboardingHeader } from '../common/onboarding-header'
import { UndrawEmpty } from 'react-undraw'
import { OptionButton } from '../common/option-button'
import { Button, TYPES, SIZES } from '../common/button'
import { ChevronDown, Search } from 'react-feather'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import firebase from '../firebase/firebase'

const filters = [
  {
    id: 1,
    name: 'Issues',
    options: [
      { id: 'ADHD', value: 'ADHD', label: 'ADHD' },
      {
        id: 'Addiction (Substance, Gambling, Sex, etc.)',
        value: 'Addiction (Substance, Gambling, Sex, etc.)',
        label: 'Addiction (Substance, Gambling, Sex, etc.)',
      },
      {
        id: 'Adoption',
        value: 'Adoption',
        label: 'Adoption',
      },
      {
        id: 'Alzheimer’s',
        value: 'Alzheimer’s',
        label: 'Alzheimer’s',
      },
      {
        id: 'Anger management',
        value: 'Anger management',
        label: 'Anger management',
      },
      {
        id: 'Antisocial Personality',
        value: 'Antisocial Personality',
        label: 'Antisocial Personality',
      },
      { id: 'Anxiety', value: 'Anxiety', label: 'Anxiety' },
      {
        id: 'Asperger’s',
        value: 'Asperger’s',
        label: 'Asperger’s',
      },
      { id: 'Autism', value: 'Autism', label: 'Autism' },
      {
        id: 'Behavioral issues',
        value: 'Behavioral issues',
        label: 'Behavioral issues',
      },
      { id: 'Bipolar', value: 'Bipolar', label: 'Bipolar' },
      { id: 'Body Image', value: 'Body Image', label: 'Body Image' },
      {
        id: 'Borderline personality',
        value: 'Borderline personality',
        label: 'Borderline personality',
      },
      {
        id: 'Chronic illness/pain',
        value: 'Chronic illness/pain',
        label: 'Chronic illness/pain',
      },
      { id: 'Codependency', value: 'Codependency', label: 'Codependency' },
      { id: 'Depression', value: 'Depression', label: 'Depression' },
      {
        id: 'Developmental Disorders',
        value: 'Developmental Disorders',
        label: 'Developmental Disorders',
      },
      { id: 'Divorce', value: 'Divorce', label: 'Divorce' },
      {
        id: 'Dual diagnosis',
        value: 'Dual diagnosis',
        label: 'Dual diagnosis',
      },
      {
        id: 'Eating disorders',
        value: 'Eating disorders',
        label: 'Eating disorders',
      },
      {
        id: 'Emotional disturbance',
        value: 'Emotional disturbance',
        label: 'Emotional disturbance',
      },
      {
        id: 'Family conflict',
        value: 'Family conflict',
        label: 'Family conflict',
      },
      { id: 'Grief', value: 'Grief', label: 'Grief' },
      { id: 'Hoarding', value: 'Hoarding', label: 'Hoarding' },
      {
        id: 'Identity development',
        value: 'Identity development',
        label: 'Identity development',
      },
      { id: 'Infertility', value: 'Infertility', label: 'Infertility' },
      { id: 'Infidelity', value: 'Infidelity', label: 'Infidelity' },
      {
        id: 'Intellectual disabilities',
        value: 'Intellectual disabilities',
        label: 'Intellectual disabilities',
      },
      {
        id: 'Learning disabilities',
        value: 'Learning disabilities',
        label: 'Learning disabilities',
      },
      { id: 'Life coaching', value: 'Life coaching', label: 'Life coaching' },
      {
        id: 'Life transitions',
        value: 'Life transitions',
        label: 'Life transitions',
      },
      { id: 'Medical detox', value: 'Medical detox', label: 'Medical detox' },
      {
        id: 'Narcissistic personality',
        value: 'Narcissistic personality',
        label: 'Narcissistic personality',
      },
      {
        id: 'Obsessive-compulsive (OCD)',
        value: 'Obsessive-compulsive (OCD)',
        label: 'Obsessive-compulsive (OCD)',
      },
      {
        id: 'Oppositional-defiant (ODD)',
        value: 'Oppositional-defiant (ODD)',
        label: 'Oppositional-defiant (ODD)',
      },
      { id: 'Parenting', value: 'Parenting', label: 'Parenting' },
      {
        id: 'Pregnancy, Prenatal, Postpartum',
        value: 'Pregnancy, Prenatal, Postpartum',
        label: 'Pregnancy, Prenatal, Postpartum',
      },
      { id: 'PTSD', value: 'PTSD', label: 'PTSD' },
      {
        id: 'Racial Identity',
        value: 'Racial Identity',
        label: 'Racial Identity',
      },
      {
        id: 'Relationship issues',
        value: 'Relationship issues',
        label: 'Relationship issues',
      },
      { id: 'School issues', value: 'School issues', label: 'School issues' },
      { id: 'Self esteem', value: 'Self esteem', label: 'Self esteem' },
      { id: 'Self harming', value: 'Self harming', label: 'Self harming' },
      {
        id: 'Sleep or insomnia issues',
        value: 'Sleep or insomnia issues',
        label: 'Sleep or insomnia issues',
      },
      { id: 'Spirituality', value: 'Spirituality', label: 'Spirituality' },
      {
        id: 'Sports Performance',
        value: 'Sports Performance',
        label: 'Sports Performance',
      },
      { id: 'Stress', value: 'Stress', label: 'Stress' },
      {
        id: 'Substance abuse',
        value: 'Substance abuse',
        label: 'Substance abuse',
      },
      {
        id: 'Substance abuse',
        value: 'Substance abuse',
        label: 'Substance abuse',
      },
      { id: 'Trauma', value: 'Trauma', label: 'Trauma' },
    ].map(issue => issue.value),
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
      { id: 'Aetna', value: 'Aetna', label: 'Aetna' },
      {
        id: 'Anthem',
        value: 'Anthem',
        label: 'Anthem',
      },
      {
        id: 'Apple Health',
        value: 'Apple Health',
        label: 'Apple Health',
      },
      { id: 'Asuris', value: 'Asuris', label: 'Asuris' },
      {
        id: 'Blue Cross Blue Shield',
        value: 'Blue Cross Blue Shield',
        label: 'Blue Cross Blue Shield',
      },
      { id: 'BridgeSpan', value: 'BridgeSpan', label: 'BridgeSpan' },
      { id: 'Cambia', value: 'Cambia', label: 'Cambia' },
      {
        id: 'Carefirst',
        value: 'Carefirst',
        label: 'Carefirst',
      },
      {
        id: 'Centene',
        value: 'Centene',
        label: 'Centene',
      },
      {
        id: 'Cigna',
        value: 'Cigna',
        label: 'Cigna',
      },
      {
        id: 'Community Health Plan of Washington',
        value: 'Community Health Plan of Washington',
        label: 'Community Health Plan of Washington',
      },
      {
        id: 'Coordinated Care',
        value: 'Coordinated Care',
        label: 'Coordinated Care',
      },
      {
        id: 'Coventry',
        value: 'Coventry',
        label: 'Coventry',
      },
      {
        id: 'HCSC',
        value: 'HCSC',
        label: 'HCSC',
      },
      {
        id: 'Health Alliance',
        value: 'Health Alliance',
        label: 'Health Alliance',
      },
      {
        id: 'Highmark',
        value: 'Highmark',
        label: 'Highmark',
      },
      {
        id: 'HIP',
        value: 'HIP',
        label: 'HIP',
      },
      {
        id: 'Humana',
        value: 'Humana',
        label: 'Humana',
      },
      {
        id: 'Independent Blue Cross',
        value: 'Independent Blue Cross',
        label: 'Independent Blue Cross',
      },
      {
        id: 'ISHIP',
        value: 'ISHIP',
        label: 'ISHIP',
      },
      {
        id: 'Kaiser Foundation Health Plan of Washington',
        value: 'Kaiser Foundation Health Plan of Washington',
        label: 'Kaiser Foundation Health Plan of Washington',
      },
      {
        id: 'Kaiser Permanente',
        value: 'Kaiser Permanente',
        label: 'Kaiser Permanente',
      },
      {
        id: 'Lifetime',
        value: 'Lifetime',
        label: 'Lifetime',
      },
      {
        id: 'LifeWise',
        value: 'LifeWise',
        label: 'LifeWise',
      },
      {
        id: 'Medicaid',
        value: 'Medicaid',
        label: 'Medicaid',
      },
      {
        id: 'Medicare',
        value: 'Medicare',
        label: 'Medicare',
      },
      {
        id: 'Metropolitan',
        value: 'Metropolitan',
        label: 'Metropolitan',
      },
      {
        id: 'Molina',
        value: 'Molina',
        label: 'Molina',
      },
      {
        id: 'Premera Blue Cross',
        value: 'Premera Blue Cross',
        label: 'Premera Blue Cross',
      },
      {
        id: 'Regence BlueShield',
        value: 'Regence BlueShield',
        label: 'Regence BlueShield',
      },
      {
        id: 'United',
        value: 'United',
        label: 'United',
      },
      {
        id: 'Wellcare',
        value: 'Wellcare',
        label: 'Wellcare',
      },
      {
        id: 'Wellpoint',
        value: 'Wellpoint',
        label: 'Wellpoint',
      },
      {
        id: 'Other',
        value: 'Other',
        label: 'Other',
      },
    ].map(insurance => insurance.value),
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
      {
        id: 'AAPC (Association of Pastoral Counselors)',
        value: 'AAPC (Association of Pastoral Counselors)',
        label: 'AAPC (Association of Pastoral Counselors)',
      },
      {
        id: 'ACSW (Academy of Certified Social Worker)',
        value: 'ACSW (Academy of Certified Social Worker)',
        label: 'ACSW (Academy of Certified Social Worker)',
      },
      {
        id: 'DO (Doctor of Osteopathic Medicine)',
        value: 'DO (Doctor of Osteopathic Medicine)',
        label: 'DO (Doctor of Osteopathic Medicine)',
      },
      {
        id: 'FNP-BC (Family Nurse Practitioner Board Certified)',
        value: 'FNP-BC (Family Nurse Practitioner Board Certified)',
        label: 'FNP-BC (Family Nurse Practitioner Board Certified)',
      },
      {
        id: 'LCSW, Licensed Clinical Social Worker',
        value: 'LCSW, Licensed Clinical Social Worker',
        label: 'LCSW, Licensed Clinical Social Worker',
      },
      {
        id: 'LICSW, Licensed Independent Social Workers',
        value: 'LICSW, Licensed Independent Social Workers',
        label: 'LICSW, Licensed Independent Social Workers',
      },
      {
        id: 'LMFT, Licensed Marriage and Family Therapist',
        value: 'LMFT, Licensed Marriage and Family Therapist',
        label: 'LMFT, Licensed Marriage and Family Therapist',
      },
      {
        id: 'LPC (Licensed Professional Counselor)',
        value: 'LPC (Licensed Professional Counselor)',
        label: 'LPC (Licensed Professional Counselor)',
      },
      {
        id: 'MD (Doctor of Medicine)',
        value: 'MD (Doctor of Medicine)',
        label: 'MD (Doctor of Medicine)',
      },
      {
        id: 'M.S./M.A. (Master’s degree)',
        value: 'M.S./M.A. (Master’s degree)',
        label: 'M.S./M.A. (Master’s degree)',
      },
      {
        id: 'MSW (Master’s degree in social work)',
        value: 'MSW (Master’s degree in social work)',
        label: 'MSW (Master’s degree in social work)',
      },
      {
        id: 'NCLEX (National Council Licensure Examination)',
        value: 'NCLEX (National Council Licensure Examination)',
        label: 'NCLEX (National Council Licensure Examination)',
      },
      {
        id: 'Ph.D. (Doctor of Philosophy)',
        value: 'Ph.D. (Doctor of Philosophy)',
        label: 'Ph.D. (Doctor of Philosophy)',
      },
      {
        id: 'PharmD (Doctor of Pharmacy)',
        value: 'PharmD (Doctor of Pharmacy)',
        label: 'PharmD (Doctor of Pharmacy)',
      },
      {
        id: 'PMHNP-BC (Board Certification in psychiatric nursing)',
        value: 'PMHNP-BC (Board Certification in psychiatric nursing)',
        label: 'PMHNP-BC (Board Certification in psychiatric nursing)',
      },
      {
        id: 'Ph.D. (Doctor of Philosophy)',
        value: 'Ph.D. (Doctor of Philosophy)',
        label: 'Ph.D. (Doctor of Philosophy)',
      },
    ].map(credential => credential.value),
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

  function handleClearFiltersOneType(map) {
    const newMap = allCheckedItems
    map.forEach((value, key, map) => {
      newMap.set(key, false)
    })
    setAllCheckedItems(newMap)
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
    const snapshot = await firebase.filterProviders(terms)
    const queriedProvider = snapshot.docs.map(doc => doc.data())
    setAllProviders(queriedProvider)
    setPageCount(Math.ceil(queriedProvider.length / providersPerPage))
  }

  function handlePageClick(data) {
    setCurrentPage(data.selected + 1)
    window.scrollTo(0, 0)
  }

  const indexOfLastProvider = currentPage * providersPerPage
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage
  const currentProviders = allProviders.slice(
    indexOfFirstProvider,
    indexOfLastProvider
  )

  return (
    <div className={styles.container}>
      <OnboardingHeader step={2} />
      <div className={styles.maxWidthContainer}>
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
              // options={colourOptions}
            />
          </div>
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
              handleClearFiltersOneType={handleClearFiltersOneType}
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
        </div>

        {currentProviders.length !== 0 ? (
          <div className={styles.providersContainer}>
            {currentProviders.map(provider => (
              <ProviderCard provider={provider} key={provider.name} />
            ))}
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
