import React from 'react'
import styles from './input-field.module.css'

export const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <input
        className={styles.input}
        value={name}
        type={type}
        onChange={onChange}
      />
    </div>
  )
}
