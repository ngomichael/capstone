import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './back-button.module.css'
import { ChevronLeft } from 'react-feather'

export const BackButton = ({ path }) => {
  return (
    <Link to={path} className={styles.container}>
      <ChevronLeft />
      <p>Back</p>
    </Link>
  )
}

BackButton.propTypes = {
  path: PropTypes.string,
}
