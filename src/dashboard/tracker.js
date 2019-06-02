import React, { useState, useEffect } from 'react'
import styles from './tracker.module.css'
import { Link } from '@reach/router'
import { ROUTES } from '../constants/routes'
import { DotLoader } from 'react-spinners'
import firebase from '../firebase/firebase'
import { Trash2 } from 'react-feather'
import { UserConsumer } from '../context/user-context'

export const Tracker = ({ savedProviderIds }) => {
  const [savedProviders, setSavedProviders] = useState([])

  useEffect(() => {
    getSavedProviders()
    window.scrollTo(0, 0)
  }, [savedProviderIds])

  function getSavedProviders() {
    let providers = []
    savedProviderIds.forEach(async id => {
      const snapshot = await firebase.getProviderInfo(id)
      const providerInfo = snapshot.docs.map(doc => doc.data())[0]
      providers = [...providers, providerInfo]
      setSavedProviders(providers)
      //   setSavedProviders([...savedProviders, providerInfo])
    })
  }

  return (
    <UserConsumer>
      {context => (
        <div className={styles.container}>
          <h1 className={styles.title}>Saved Providers Tracker</h1>
          {savedProviders.length !== 0 ? (
            <div className={styles.savedProvidersContainer}>
              {savedProviders.map(provider => {
                return (
                  <div className={styles.savedProviderCard}>
                    <Link
                      to={`/dashboard/${provider.id}`}
                      className={styles.name}
                    >
                      {provider.name}
                    </Link>
                    <Trash2
                      size={30}
                      color="rgb(255, 62, 62)"
                      className={styles.trashIcon}
                      onClick={() => firebase.unfavoriteProvider(provider.id)}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <DotLoader sizeUnit={'px'} size={50} color={'hsl(174, 74%, 39%)'} />
          )}
        </div>
      )}
    </UserConsumer>
  )
}
