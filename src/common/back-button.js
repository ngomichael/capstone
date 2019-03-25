import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './back-button.module.css'
import { SVG } from '../common/svg'

export const BackButton = props => {
  return (
    <div className={styles.container}>
      <SVG width="24" height="24" viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6" />
        <p>Back</p>
      </SVG>
      <p>Back</p>
    </div>
  )
}
