import React, { useState } from 'react'
import styles from './dashboard-header.module.css'
import { Link } from '@reach/router'
import PearCareIcon from '../icons/pearcare-icon.png'
import { ROUTES } from '../constants/routes'

const navLinksText = [
  {
    text: 'Dashboard',
    path: ROUTES.dashboard,
  },
  { text: 'Tracker', path: ROUTES.tracker },
  { text: 'Sign out', path: ROUTES.signIn },
]

function renderNavLinks() {
  return navLinksText.map(link => (
    <Link to={link.path} className={styles.navLink} key={link.text}>
      <li key={link.title}>{link.text}</li>
    </Link>
  ))
}

export const DashboardHeader = () => {
  return (
    <header className={styles.container}>
      <Link to={ROUTES.home} className={styles.logoAndNameContainer}>
        <img src={PearCareIcon} className={styles.logo} />
        <p className={styles.productName}>PearCare</p>
      </Link>

      <ul className={styles.navContainer}>{renderNavLinks()}</ul>
    </header>
  )
}
