import React from 'react'
import styles from './home-header.module.css'
import PearCareLogo from '../images/logo.png'
import { Button, TYPES, SIZES } from './button'

const navLinks = ['How it Works', 'For Providers']

export const HomeHeader = () => (
  <header className={styles.container}>
    <div className={styles.nameAndNavContainer}>
      <div className={styles.imageNameContainer}>
        <img src={PearCareLogo} className={styles.productImage} />
        <h1 className={styles.productName}>PearCare</h1>
      </div>
      <ul className={styles.navContainer}>
        {navLinks.map(link => (
          <li className={styles.navButton} key={link.title}>
            {link}
          </li>
        ))}
        <li className={styles.navButton}>
          <Button
            type="button"
            buttonType={TYPES.PRIMARY}
            buttonSize={SIZES.SMALL}
          >
            Sign In
          </Button>
        </li>
      </ul>
    </div>
  </header>
)
