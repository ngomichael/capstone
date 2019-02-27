import React from 'react'
import styles from './Card.module.css'

const Card = props => {
  return (
    <div className={styles.container}>
      <div className={styles.icon} />
      <div className={styles.textContainer}>
        <p className={styles.therapistType}>Therapist</p>
        <p className={styles.therapistDescription}>The ones that talk</p>
      </div>
    </div>
  )
}

export default Card
