import React from 'react'
import styles from './chip.module.css'
import { XCircle } from 'react-feather'

export const Chip = ({ handleChipRemove, text }) => {
  return (
    <div onClick={() => handleChipRemove(text)} className={styles.container}>
      <p style={{ color: 'white' }}>{text}</p>
      <XCircle className={styles.xIcon} color="white" size={20} />
    </div>
  )
}
