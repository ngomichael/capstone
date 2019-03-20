import React, { useState } from 'react'
import styles from './home-header.module.css'
import PearCareLogo from '../images/logo.png'
import { SVG } from '../common/svg'

const navLinksText = ['How it Works', 'For Providers', 'Log in', 'Sign up']

function renderNavLinks() {
  return navLinksText.map(link => (
    <li className={styles.navLink} key={link.title}>
      {link}
    </li>
  ))
}

function renderDropdownNavLinks() {
  return navLinksText.map(link => (
    <li className={styles.dropdownNavLink} key={link.title}>
      {link}
    </li>
  ))
}

export const HomeHeader = () => {
  const [displayMenu, setDisplayMenu] = useState(false)

  function handleMenuClick() {
    setDisplayMenu(!displayMenu)
  }

  return (
    <header className={styles.container}>
      <div className={styles.logoAndNameContainer}>
        <img src={PearCareLogo} className={styles.logo} />
        <p className={styles.productName}>PearCare</p>
      </div>

      {displayMenu ? (
        <SVG
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={styles.menuIcon}
          onClick={handleMenuClick}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </SVG>
      ) : (
        <SVG
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={styles.menuIcon}
          onClick={handleMenuClick}
        >
          <line x1="3" y1="14" x2="21" y2="14" />
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="21" x2="21" y2="21" />
        </SVG>
      )}

      {displayMenu ? (
        <div className={styles.dropdownContainer}>
          <ul className={styles.dropdownNav}>{renderDropdownNavLinks()}</ul>
        </div>
      ) : (
        <ul className={styles.navContainer}>{renderNavLinks()}</ul>
      )}
    </header>
  )
}
