import React, { useState } from 'react'
import styles from './home-header.module.css'
import { Link } from '@reach/router'
import PearCareIcon from '../icons/pearcare-icon.png'
import { X, Menu } from 'react-feather'

const navLinksText = [
  {
    text: 'How it Works',
    link: 'https://krystl37.wixsite.com/pearcarelanding',
  },
  { text: 'For providers', path: '/signin' },
  { text: 'Log in/Sign up', path: '/signin' },
]

function renderNavLinks() {
  return navLinksText.map(link =>
    link.path ? (
      <Link to={link.path} className={styles.navLink} key={link.text}>
        <li key={link.title}>{link.text}</li>
      </Link>
    ) : (
      <a
        href={link.link}
        rel="noopener noreferrer"
        target="_blank"
        className={styles.navLink}
        key={link.text}
      >
        <li>{link.text}</li>
      </a>
    )
  )
}

function renderDropdownNavLinks() {
  return navLinksText.map(link =>
    link.path ? (
      <Link to={link.path} className={styles.dropdownNavLink} key={link.text}>
        <li key={link.title}>{link.text}</li>
      </Link>
    ) : (
      <a href={link.link} className={styles.dropdownNavLink} key={link.text}>
        <li>{link.text}</li>
      </a>
    )
  )
}

export const HomeHeader = () => {
  const [displayMenu, setDisplayMenu] = useState(false)

  function handleMenuClick() {
    setDisplayMenu(!displayMenu)
  }

  return (
    <header className={styles.container}>
      <div className={styles.logoAndNameContainer}>
        <img src={PearCareIcon} className={styles.logo} />
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
