import React, { useState } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import styles from './provider-card.module.css'
import { Mail, Heart, ExternalLink } from 'react-feather'

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

  // const { name, photo, credentials, summary } = provider
  console.log(provider.questionnaire_answers)
  return (
    <Link to="/providerInfo" className={styles.link}>
      <div
        className={styles.container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.contactInfo}>
          <div className={styles.photoandInfoContainer}>
            {/* <img src={photo} className={styles.providerPhoto} /> */}
            <div className={styles.providerInfo}>
              <p className={styles.name}>{provider.name}</p>
              <p>{provider.address}</p>
              <p>100% Match</p>
            </div>
          </div>
          <div className={styles.contactActions}>
            <Mail className={styles.contactAction} />
            <Heart className={styles.contactAction} />
            <ExternalLink className={styles.contactAction} />
          </div>
        </div>

        <div className={styles.overview}>
          {provider.questionnaire_answers.map(item => {
            return (
              <div className={styles.itemContainer} key={item.label}>
                <p className={styles.label}>{item.label}</p>
                <p>{item.values.slice(0, 3).join(', ')}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

ProviderCard.propTypes = {
  provider: PropTypes.shape({
    // name: PropTypes.string.isRequired,
    // photo: PropTypes.node.isRequired,
    // credentials: PropTypes.string.isRequired,
  }),
}
