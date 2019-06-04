import React, { useState, useEffect } from 'react'
import styles from './dashboard.module.css'
import firebase from '../firebase/firebase'
import { DashboardHeader } from './dashboard-header'
import { MatchedProviders } from '../matched-providers/matched-providers'
import { UserConsumer } from '../context/user-context'
import { Action } from './action'
import { ROUTES } from '../constants/routes'

const actions = [
  {
    title: 'Track your progress',
    description: 'Keep track of providers that you have saved.',
    linkText: "Let's go view and reach out to them.",
    path: ROUTES.tracker,
  },
]

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
            <h1 className={styles.welcomeMessage}>Welcome back</h1>
          </div>
          <div className={styles.actionsContainer}>
            {actions.map(action => (
              <Action
                title={action.title}
                description={action.description}
                linkText={action.linkText}
                path={action.path}
              />
            ))}
          </div>

          <MatchedProviders context={context} />
        </div>
      )}
    </UserConsumer>
  )
}
