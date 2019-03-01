import React, { useState } from 'react'
import styles from './OptionButton.module.css'

const OptionButton = ({ children }) => {
  const [clicked, changeClickedStatus] = useState(false)

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

export default OptionButton
