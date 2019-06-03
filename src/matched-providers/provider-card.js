import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import styles from './provider-card.module.css'
import { Mail, Heart, ExternalLink } from 'react-feather'
import AcceptingClientsIcon from '../icons/accepting-clients.png'
import firebase from '../firebase/firebase'
import { UserConsumer } from '../context/user-context'

export class ProviderCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSaved: false,
    }
  }

  componentDidMount() {
    this.setState({
      isSaved: this.props.context.userInfo.savedProviders.includes(
        this.props.provider.id
      ),
    })
  }

  render() {
    const { provider, delay } = this.props  //is this.props the item given from the matched-providers??, To get the fields do I just decompose the item? 
    return (
      <UserConsumer>
        {context => (
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
                <a
                  className={styles.contactAction}
                  onClick={() => {
                    this.state.isSaved
                      ? firebase.unfavoriteProvider(provider.id)
                      : firebase.favoriteProvider(provider.id)

                    this.setState({
                      isSaved: !this.state.isSaved,
                    })
                  }}
                >
                  <Heart
                    style={{
                      fill: this.state.isSaved && 'hsl(174, 74%, 39%)',
                    }}
                  />
                </a>
                {provider.website && (
                  <a
                    className={styles.contactAction}
                    href={provider.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ExternalLink />
                  </a>
                )}
              </div>
              <Link
                to={provider.id}
                state={{ isSaved: this.state.isSaved }}
                className={styles.link}
              >
                <div
                  className={styles.card}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <div className={styles.contactInfo}>
                    <div className={styles.photoandInfoContainer}>
                      <img
                        src={provider.photo}
                        className={styles.providerPhoto}
                      />
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
        )}
      </UserConsumer>
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
