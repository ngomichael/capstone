import React, { useState } from 'react'
import styles from './home-header.module.css'
import PearCareLogo from '../images/logo.png'
import { X, Menu } from 'react-feather'

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

      {/* Display the X or Hamburger Menu Icon  */}
      {displayMenu ? (
        <X className={styles.menuIcon} onClick={handleMenuClick} />
      ) : (
        <Menu className={styles.menuIcon} onClick={handleMenuClick} />
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
