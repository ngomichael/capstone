import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CheckboxContainer from '../common/checkbox-container'
import styles from './option-button.module.css'

export const OptionButton = ({ children, options }) => {
  const [clicked, changeClickedStatus] = useState(false)

  function handleClickedStatusChange() {
    changeClickedStatus(!clicked)
  }

  return (
    <span>
      <button
        onClick={handleClickedStatusChange}
        // className={
        //   clicked ? `${styles.button} ${styles.activeButton}` : styles.button
        // }
        className={styles.button}
      >
        {/* <div>{options.map(option => {})}</div> */}
        <p>{children}</p>
      </button>
      {/* <CheckboxContainer options={options} /> */}
    </span>
  )
}

OptionButton.propTypes = {
  isClicked: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
