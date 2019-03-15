import React from 'react'
import styles from './SignedOutHeader.module.css'
import { Link, animateScroll as scroll } from 'react-scroll'
import PearCareLogo from '../images/PearCareLogo.png'

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

const SignedOutHeader = () => (
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
          <button className={styles.signInButton}>Sign In</button>
        </li>
      </ul>
    </div>
  </header>
)

export default SignedOutHeader
