import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import styles from './provider-card.module.css'
import { Mail, Heart, ExternalLink } from 'react-feather'

export const ProviderCard = ({ provider }) => {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter() {
    setIsHovered(!isHovered)
  }

  function handleMouseLeave() {
    setIsHovered(!isHovered)
  }

  return (
    // <Link to={assignment.id}>{assignment.name}</Link>
    <Link to={provider.id} className={styles.link}>
      <div
        className={styles.container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.contactInfo}>
          <div className={styles.photoandInfoContainer}>
            <img src={provider.photo} className={styles.providerPhoto} />
            <div className={styles.providerInfo}>
              <p className={styles.name}>{provider.name}</p>
              <b className={styles.matchPercentage}>100% Match</b>
              <p className={styles.address}>{provider.address}</p>
            </div>
          </div>
          <div className={styles.contactActions}>
            <Mail
              onClick={e => {
                e.preventDefault()
                alert('hello')
              }}
              className={styles.contactAction}
            />
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
