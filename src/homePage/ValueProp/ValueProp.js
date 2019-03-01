import React from 'react'
import styles from './ValueProp.module.css'

const ValueProp = ({ value }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{value.icon}</div>
      <div className={styles.valuePropContainer}>
        <h1 className={styles.valuePropName}>{value.title}</h1>
        <p className={styles.valuePropDescription}>{value.description}</p>
      </div>
    </div>
  )
}

export default ValueProp
