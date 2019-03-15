import React, { useState } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import styles from './ProviderListItem.module.css'

const ProviderListItem = ({ provider }) => {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter() {
    setIsHovered(!isHovered)
  }

  function handleMouseLeave() {
    setIsHovered(!isHovered)
  }

  return (
    <Link to="/providerInfo" style={{ textDecoration: 'none', color: 'black' }}>
      <div
        className={styles.container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={provider.photo} className={styles.providerPhoto} />
        {/* <div className={styles.providerPhoto} /> */}
        <div className={styles.providerInfo}>
          <p className={styles.name}>{provider.name}</p>
          <p className={styles.specialization}>{provider.specialization}</p>
          <p className={styles.summaary}>{provider.summary}</p>
        </div>
        <div className={styles.actionsContianer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1AAE9F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '20px', marginLeft: '20px' }}
            className={styles.action}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1AAE9F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isHovered ? styles.chevronActive : styles.chevron}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

ProviderListItem.propTypes = {
  name: PropTypes.string,
  specialization: PropTypes.string,
  summaary: PropTypes.string,
}

export default ProviderListItem
