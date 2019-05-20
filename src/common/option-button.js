import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CheckboxContainer from '../common/checkbox-container'
import styles from './option-button.module.css'

export const OptionButton = ({
  children,
  options,
  onChange,
  checkedItems,
  onApplyFilter,
  onClick,
  id,
  activeCheckboxContainer,
}) => {
  const [clicked, changeClickedStatus] = useState(false)

  function handleClickedStatusChange() {
    changeClickedStatus(!clicked)
    onClick()
  }

  function handleApplyFilter() {
    changeClickedStatus(false)
    onApplyFilter()
  }

  return (
    <div className={styles.container}>
      <button onClick={handleClickedStatusChange} className={styles.button}>
        <p>{children}</p>
      </button>
      {activeCheckboxContainer === id && clicked && (
        <CheckboxContainer
          options={options}
          onChange={onChange}
          onApplyFilter={handleApplyFilter}
          checkedItems={checkedItems}
        />
      )}
    </div>
  )
}

OptionButton.propTypes = {
  isClicked: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
