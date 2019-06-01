import React, { useState, useEffect } from 'react'
import styles from './dashboard.module.css'
import firebase from '../firebase/firebase'
import { DashboardHeader } from './dashboard-header'
import { UserConsumer } from '../context/user-context'

export const Dashboard = () => {
  return (
    <UserConsumer>
      {context => (
        <div className={styles.container}>
          <DashboardHeader />
        </div>
      )}
    </UserConsumer>
  )
}
