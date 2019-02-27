import React from 'react'
import styles from './Card.module.css'
import PropTypes from 'prop-types'

const Card = props => {
  return (
    <div className={styles.container}>
      <div className={styles.icon} />
      <div className={styles.textContainer}>
        <p className={styles.providerType}>{props.providerType}</p>
        <p className={styles.providerDescription}>
          {props.providerDescription}
        </p>
      </div>
    </div>
  )
}

Card.propTypes = {
  providerType: PropTypes.string,
  providerDescription: PropTypes.string,
}

export default Card
