import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import styles from './provider-card.module.css'
import { Mail, Heart, ExternalLink } from 'react-feather'
import AcceptingClientsIcon from '../icons/accepting-clients.png'

export const ProviderCard = ({ provider }) => {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter() {
    setIsHovered(!isHovered)
  }

  function handleMouseLeave() {
    setIsHovered(!isHovered)
  }

  // console.log(provider)

  return (
    <div className={styles.container}>
      <div className={styles.contactActions}>
        <a className={styles.contactAction} href={`mailto: ${provider.email}`}>
          <Mail />
        </a>
        <a className={styles.contactAction}>
          <Heart />
        </a>
        <a
          className={styles.contactAction}
          href={provider.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLink />
        </a>
      </div>
      <Link to={provider.id} className={styles.link}>
        <div
          className={styles.card}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.contactInfo}>
            <div className={styles.photoandInfoContainer}>
              <img src={provider.photo} className={styles.providerPhoto} />
              <div className={styles.providerInfo}>
                <div className={styles.nameAndTagContainer}>
                  <p className={styles.name}>{provider.name}</p>
                  <img
                    src={AcceptingClientsIcon}
                    className={styles.acceptingClientsIcon}
                  />
                  {/* <div className={styles.acceptingClientsTag}>
                    Accepting new clients
                  </div> */}
                </div>
                <b className={styles.matchPercentage}>100% Match</b>
                <p className={styles.address}>{provider.address}</p>
              </div>
            </div>
          </div>
          <div className={styles.overview}>
            {provider.questionnaire_answers.map(item => {
              return (
                <div className={styles.itemContainer} key={item.label}>
                  <p className={styles.label}>{item.label}</p>
                  <p>{item.values.slice(0, 3).join(', ')}</p>
                  {console.log(item.values)}
                </div>
              )
            })}
          </div>
        </div>
      </Link>
    </div>
  )
}

ProviderCard.propTypes = {
  provider: PropTypes.shape({
    // name: PropTypes.string.isRequired,
    // photo: PropTypes.node.isRequired,
    // credentials: PropTypes.string.isRequired,
  }),
}
