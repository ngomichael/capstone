import React from 'react'
import PropTypes from 'prop-types'
import styles from './chip.module.css'
import { XCircle } from 'react-feather'

export const Chip = ({ handleChipRemove, text }) => {
  return (
    <div className={styles.container}>
      <p>{text}</p>
      <XCircle
        className={styles.xIcon}
        color="black"
        size={20}
        onClick={() => handleChipRemove(text)}
      />
    </div>
  )
}
