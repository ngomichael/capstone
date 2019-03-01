import React from 'react'
import styles from './OptionButton.module.css'

const OptionButton = ({ children }) => {
  return <button className={styles.button}>{children}</button>
}

export default OptionButton
