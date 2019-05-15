import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './back-button.module.css'
import { ChevronLeft } from 'react-feather'

export const BackButton = ({ path, onClick }) => {
  return onClick ? (
    <div onClick={onClick} className={styles.container}>
      <ChevronLeft />
      <span>Back</span>
    </div>
  ) : (
    <Link to={path} className={styles.container}>
      <ChevronLeft />
      <span>Back</span>
    </Link>
  )
}

BackButton.propTypes = {
  path: PropTypes.string,
}
