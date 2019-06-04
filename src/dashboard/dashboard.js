import React, { useState, useEffect } from 'react'
import styles from './dashboard.module.css'
import firebase from '../firebase/firebase'
import { DashboardHeader } from './dashboard-header'
import { MatchedProviders } from '../matched-providers/matched-providers'
import { UserConsumer } from '../context/user-context'

export const Dashboard = () => {
  return (
    <UserConsumer>
      {context => (
        <div className={styles.container}>
          <div
            style={{
              maxWidth: '1200px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <h1 className={styles.welcomeMessage}>Welcome back Arin</h1>
          </div>

          <MatchedProviders context={context} />
        </div>
      )}
    </UserConsumer>
  )
}
