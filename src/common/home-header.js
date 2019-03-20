import React from 'react'
import styles from './home-header.module.css'
import PearCareLogo from '../images/logo.png'

const navLinksText = ['How it Works', 'For Providers', 'Log in', 'Sign up']

function renderNavLinks() {
  return navLinksText.map(link => (
    <li className={styles.navLink} key={link.title}>
      {link}
    </li>
  ))
}

export const HomeHeader = () => (
  <header className={styles.container}>
    <div className={styles.logoAndNameContainer}>
      <img src={PearCareLogo} className={styles.logo} />
      <p className={styles.productName}>PearCare</p>
    </div>
    <ul className={styles.navContainer}>{renderNavLinks()}</ul>
  </header>
)
