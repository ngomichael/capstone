import React, { useState } from 'react'
import styles from './home-header.module.css'
import { Link } from '@reach/router'
import PearCareLogo from '../images/logo.png'
import { X, Menu } from 'react-feather'

const navLinksText = [
  { text: 'How it Works', path: '' },
  { text: 'For Providers', path: '' },
  { text: 'Sign In', path: '/signin' },
  { text: 'Sign up', path: '/signup' },
]

function renderNavLinks() {
  return navLinksText.map(link => (
    <Link to={link.path} className={styles.navLink}>
      <li key={link.title}>{link.text}</li>
    </Link>
  ))
}

function renderDropdownNavLinks() {
  return navLinksText.map(link => (
    <Link to={link.path} className={styles.dropdownNavLink}>
      <li key={link.title}>{link.text}</li>
    </Link>
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
