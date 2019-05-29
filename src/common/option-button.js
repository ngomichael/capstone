import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CheckboxContainer from '../common/checkbox-container'
import styles from './option-button.module.css'
import { filters, allFilterOptions } from '../constants/filters'

export const OptionButton = ({
  children,
  options,
  handleCheckboxChangeMatchedProviders,
  allCheckedItems,
  onApplyFilter,
  changeActiveCheckboxContainer,
  id,
  activeCheckboxContainer,
  handleClearFiltersOneType,
  handleShowGrayBackground,
}) => {
  const [clicked, changeClickedStatus] = useState(false)
  let checkedItems = setCheckedItems()

  function handleClickedStatusChange() {
    changeClickedStatus(!clicked)
    changeActiveCheckboxContainer()
    handleShowGrayBackground(!clicked)
  }

  function setCheckedItems() {
    let newMap = new Map()
    options.forEach(option => {
      const value = allCheckedItems.get(option) || false
      newMap = newMap.set(option, value)
    })

    return newMap
  }

  function handleApplyFilter() {
    changeClickedStatus(false)
    onApplyFilter()
    handleShowGrayBackground(!clicked)
  }

  function handleClearFilters() {
    handleClearFiltersOneType(options)
  }

  function findInMap(map, val) {
    for (let [k, v] of map) {
      if (v === val) {
        return true
      }
    }
    return false
  }

  return (
    <div className={styles.container}>
      <button
        onClick={handleClickedStatusChange}
        className={
          findInMap(checkedItems, true)
            ? styles.activeFilterButton
            : styles.filterButton
        }
      >
        <p className={styles.filterButtonText}>{children}</p>
      </button>
      {activeCheckboxContainer === id && clicked && (
        <div
          className={
            activeCheckboxContainer === id && clicked
              ? styles.checkboxContainer
              : styles.checkboxContainerHidden
          }
        >
          <CheckboxContainer
            options={options}
            handleCheckboxChangeMatchedProviders={
              handleCheckboxChangeMatchedProviders
            }
            onApplyFilter={handleApplyFilter}
            allCheckedItems={allCheckedItems}
            checkedItems={[...checkedItems.values()]}
            handleClearFilters={handleClearFilters}
          />
        </div>
      )}
    </div>
  )
}

OptionButton.propTypes = {
  isClicked: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
