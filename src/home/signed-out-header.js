import React from 'react'
import styles from './signed-out-header.module.css'
import { Link, animateScroll as scroll } from 'react-scroll'
// import PearCareLogo from '../images/PearCareLogo.png'
import PearCareLogo from '../images/logo.png'
import { Button, TYPES, SIZES } from '../common/button'

const navLinks = [
  {
    title: 'How it Works',
    name: 'Works',
  },
  {
    title: 'For Providers',
    name: 'Providers',
  },
]

const scrollToTop = () => {
  scroll.scrollToTop()
}

export const SignedOutHeader = () => (
  <header className={styles.container}>
    <div className={styles.nameAndNavContainer}>
      <div className={styles.imageNameContainer}>
        <img src={PearCareLogo} className={styles.productImage} />
        <h1 className={styles.productName} onClick={scrollToTop}>
          PearCare
        </h1>
      </div>
      <ul className={styles.navContainer}>
        {navLinks.map(link => (
          <li className={styles.navButton} key={link.title}>
            <Link to={link.name} smooth={true} duration={1000} delay={0}>
              {link.title}
            </Link>
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
