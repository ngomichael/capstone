import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CheckboxContainer from '../common/checkbox-container'
import styles from './option-button.module.css'

export const OptionButton = ({
  children,
  options,
  onChange,
  allCheckedItems,
  onApplyFilter,
  onClick,
  id,
  activeCheckboxContainer,
  handleClearFiltersOneType,
  handleShowGrayBackground,
}) => {
  const [clicked, changeClickedStatus] = useState(false)
  const [checkedItems, setCheckedItems] = useState(new Map())
  console.log(checkedItems)
  function handleClickedStatusChange() {
    changeClickedStatus(!clicked)
    onClick()
    handleShowGrayBackground(!clicked)
  }

  function handleApplyFilter() {
    changeClickedStatus(false)
    onApplyFilter()
    handleShowGrayBackground(!clicked)
  }

  function handleCheckboxChange(e) {
    const item = e.target.name
    const isChecked = e.target.checked
    const newMap = new Map([...checkedItems.set(item, isChecked)])
    setCheckedItems(newMap)
  }

  // const newMap = allCheckedItems
  //   map.forEach((value, key, map) => {
  //     newMap.set(key, false)
  //   })
  //   setAllCheckedItems(newMap)

  function handleClearFilters() {
    const currentFilters = checkedItems
    const clearedFilters = new Map()
    currentFilters.forEach((value, key, map) => {
      clearedFilters.set(key, false)
    })
    setCheckedItems(clearedFilters)
    handleClearFiltersOneType(currentFilters)
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
      <div
        className={
          activeCheckboxContainer === id && clicked
            ? styles.checkboxContainer
            : styles.checkboxContainerHidden
        }
      >
        <CheckboxContainer
          options={options}
          onChange={onChange}
          onApplyFilter={handleApplyFilter}
          allCheckedItems={allCheckedItems}
          // checkedItems={[...checkedItems.values()]}
          handleClearFilters={handleClearFilters}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      {/* )} */}
    </div>
  )
}

OptionButton.propTypes = {
  isClicked: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
