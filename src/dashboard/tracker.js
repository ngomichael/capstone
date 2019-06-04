import React, { useState, useEffect } from 'react'
import styles from './tracker.module.css'
import { Link } from '@reach/router'
import { DotLoader } from 'react-spinners'
import { UndrawEmpty } from 'react-undraw'
import firebase from '../firebase/firebase'
import { Trash2 } from 'react-feather'
import { UserConsumer } from '../context/user-context'

export const Tracker = ({ savedProviderIds }) => {
  const [savedProviders, setSavedProviders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSavedProviders()

    window.scrollTo(0, 0)
  }, [savedProviderIds])

  async function getSavedProviders() {
    console.log('hello')
    const providersPromises = savedProviderIds.map(async id => {
      const snapshot = await firebase.getProviderInfo(id)
      setIsLoading(false)
      const providerInfo = snapshot.docs.map(doc => doc.data())[0]

      return providerInfo
    })
    // console.log(providersPromises)

    const providers = await Promise.all(providersPromises)
    setSavedProviders(providers)
  }

  return (
    <UserConsumer>
      {context => (
        // console.log(isLoading),
        // console.log('WHAT THE FUCK'),
        // console.log(savedProviders),
        <div className={styles.container}>
          <h1 className={styles.title}>Saved Providers Tracker</h1>
          {isLoading === false && savedProviders.length !== 0 && (
            <div className={styles.savedProvidersContainer}>
              {savedProviders.map(provider => {
                return (
                  <div className={styles.savedProviderCard}>
                    <Link
                      to={`/dashboard/tracker/${provider.id}`}
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
          )}

          {isLoading === false && savedProviders.length === 0 && (
            <div className={styles.noProviders}>
              <UndrawEmpty primaryColor="hsl(174, 74%, 39%)" />
              <p className={styles.noProvidersText}>
                Oops, you haven't saved any providers yet. 'Heart' a provider
                you like to add them to your tracker
              </p>
            </div>
          )}

          {/* //// */}
        </div>
      )}
    </UserConsumer>
  )
}
