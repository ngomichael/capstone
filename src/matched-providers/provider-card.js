import React, { useState } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import styles from './provider-card.module.css'
import { SVG } from '../common/svg'

const overviewItems = [
  {
    label: 'Type of care',
    values: ['Therapy', 'Medication management'],
  },
  {
    label: 'Client Focus',
    values: ['Adults', 'Children'],
  },
  {
    label: 'Experienced with',
    values: ['Therapy', 'Medication management'],
  },
  {
    label: 'Credentials',
    values: ['ARNP', 'PMHNP-BC'],
  },
  {
    label: 'Approach to Treatment',
    values: [
      'During our sessions we will work together to understand what is working in your life through an evaluation and proceed to therapy when desired. Additionally, my approach also includes medication management and if that is a better solution to your needs, we will go that route',
    ],
  },
]

export const ProviderCard = ({ provider }) => {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter() {
    setIsHovered(!isHovered)
  }

  function handleMouseLeave() {
    setIsHovered(!isHovered)
  }

  const { name, photo, credentials, summary } = provider

  return (
    <Link to="/providerInfo" className={styles.link}>
      <div
        className={styles.container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.contactInfo}>
          <div className={styles.photoandInfoContainer}>
            <img src={photo} className={styles.providerPhoto} />
            <div className={styles.providerInfo}>
              <p className={styles.name}>{name}</p>
              <p>Seattle, WA 98107</p>
              <p>100% Match</p>
            </div>
          </div>
          <div className={styles.contactActions}>
            <SVG
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={styles.contactAction}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </SVG>
            <SVG
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={styles.contactAction}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </SVG>
            <a href="https://google.com">
              <SVG
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={styles.contactAction}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </SVG>
            </a>
          </div>
        </div>

        <div className={styles.overview}>
          {overviewItems.map(item => {
            return (
              <div className={styles.itemContainer}>
                <p className={styles.label}>{item.label}</p>
                <p>{item.values.join(', ')}</p>
              </div>
            )
          })}
        </div>
        {/* <div className={styles.actionsContianer}>
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
        </div> */}
      </div>
    </Link>
  )
}

ProviderCard.propTypes = {
  provider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.node.isRequired,
    credentials: PropTypes.string.isRequired,
  }),
}
