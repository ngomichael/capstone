import React, { useState } from 'react'
import styles from './dashboard-header.module.css'
import { Link, navigate } from '@reach/router'
import PearCareIcon from '../icons/pearcare-icon.png'
import { ROUTES } from '../constants/routes'
import firebase from '../firebase/firebase'

const navLinksText = [
  {
    text: 'Dashboard',
    path: ROUTES.dashboard,
    onClick: () => {},
  },
  {
    text: 'Tracker',
    path: ROUTES.tracker,
    onClick: () => navigate(ROUTES.tracker),
  },
  { text: 'Sign out', path: ROUTES.home, onClick: handleSignOut },
]

async function handleSignOut() {
  try {
    await firebase.signOut()
  } catch (err) {
    console.error(err)
  }
}

function renderNavLinks() {
  return navLinksText.map(link => (
    <Link
      to={link.path}
      className={styles.navLink}
      onClick={link.onClick}
      key={link.text}
    >
      <li key={link.title}>{link.text}</li>
    </Link>
  ))
}

export const DashboardHeader = () => {
  return (
    <header className={styles.container}>
      <Link to={ROUTES.dashboard} className={styles.logoAndNameContainer}>
        <img src={PearCareIcon} className={styles.logo} />
        <p className={styles.productName}>PearCare</p>
      </Link>

      <ul className={styles.navContainer}>{renderNavLinks()}</ul>
    </header>
  )
}
