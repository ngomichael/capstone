import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CheckboxContainer from '../common/checkbox-container'
import styles from './option-button.module.css'

export const OptionButton = ({ children, options, onChange, checkedItems }) => {
  const [clicked, changeClickedStatus] = useState(false)

  function handleClickedStatusChange() {
    changeClickedStatus(!clicked)
  }

  return (
    <div className={styles.container}>
      <button onClick={handleClickedStatusChange} className={styles.button}>
        <p>{children}</p>
      </button>
      {clicked && (
        <CheckboxContainer
          options={options}
          onChange={onChange}
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
