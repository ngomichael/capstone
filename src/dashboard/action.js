import React from 'react'
import styles from './action.module.css'
import { Link, Redirect, navigate } from '@reach/router'
import { ROUTES } from '../constants/routes'

export const Action = ({ title, description, linkText, path }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <Link to={path} className={styles.link}>
        {linkText}
      </Link>
    </div>
  )
}
