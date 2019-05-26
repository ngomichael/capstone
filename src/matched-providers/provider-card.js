import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import styles from './provider-card.module.css'
import { Mail, Heart, ExternalLink } from 'react-feather'
import AcceptingClientsIcon from '../icons/accepting-clients.png'

export class ProviderCard extends React.Component {
  // state = {
  //   isHovered: false,
  // }

  // handleMouseEnter = () => {
  //   this.setState({
  //     isHovered: true,
  //   })
  // }

  // handleMouseLeave = () => {
  //   this.setState({
  //     isHovered: false,
  //   })
  // }

  render() {
    const { provider, delay } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.contactActions}
            style={{ animationDelay: `${delay}ms` }}
          >
            <a
              className={styles.contactAction}
              href={`mailto: ${provider.email}`}
            >
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
              style={{ animationDelay: `${delay}ms` }}
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
            >
              <div className={styles.contactInfo}>
                <div className={styles.photoandInfoContainer}>
                  <img src={provider.photo} className={styles.providerPhoto} />
                  <div className={styles.providerInfo}>
                    <div className={styles.nameAndTagContainer}>
                      <p className={styles.name}>{provider.name}</p>
                      {provider.accepting_clients && (
                        <img
                          src={AcceptingClientsIcon}
                          className={styles.acceptingClientsIcon}
                        />
                      )}
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
                    </div>
                  )
                })}
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

ProviderCard.propTypes = {
  provider: PropTypes.shape({
    // name: PropTypes.string.isRequired,
    // photo: PropTypes.node.isRequired,
    // credentials: PropTypes.string.isRequired,
  }),
}
