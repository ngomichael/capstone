import React, { useState, useEffect } from 'react'
import styles from './tracker.module.css'
import { Link } from '@reach/router'
import { ROUTES } from '../constants/routes'
import firebase from '../firebase/firebase'
import { UserConsumer } from '../context/user-context'

export const Tracker = ({ savedProviderIds }) => {
  const [savedProviders, setSavedProviders] = useState([])

  useEffect(() => {
    getSavedProviders()
    window.scrollTo(0, 0)
  }, [savedProviderIds])

  function getSavedProviders() {
    let provs = []
    savedProviderIds.forEach(async id => {
      const snapshot = await firebase.getProviderInfo(id)
      const providerInfo = snapshot.docs.map(doc => doc.data())[0]
      //   console.log(providerInfo)
      //   setSavedProviders([providerInfo])
      //   console.log(savedProviders)
      //   console.log(providerInfo)
      provs = [...provs, providerInfo]
      setSavedProviders(provs)
    })
  }

  return (
    <UserConsumer>
      {context => (
        // console.log(provider),
        console.log(savedProviders),
        (
          <div>
            <h1>Provider Tracker</h1>
          </div>
        )
      )}
    </UserConsumer>
  )
}
