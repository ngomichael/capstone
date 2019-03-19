import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './option-button.module.css'

const OptionButton = ({ children, isClicked = false }) => {
  const [clicked, changeClickedStatus] = useState(isClicked)

  function handleClickedStatusChange() {
    changeClickedStatus(!clicked)
  }

  return (
    <button
      onClick={handleClickedStatusChange}
      className={
        clicked ? `${styles.button} ${styles.activeButton}` : styles.button
      }
    >
      {children}
    </button>
  )
}

OptionButton.propTypes = {
  isClicked: PropTypes.bool,
}

export default OptionButton
