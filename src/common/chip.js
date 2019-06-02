import React from 'react'
import styles from './chip.module.css'
import { XCircle } from 'react-feather'

export const Chip = ({ handleChipRemove, text }) => {
  return (
    <div onClick={() => handleChipRemove(text)} className={styles.container}>
      <p>{text}</p>
      <XCircle className={styles.xIcon} color="hsl(228, 21%, 31%)" size={20} />
    </div>
  )
}
