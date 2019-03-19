import React from 'react'
import classNames from 'classnames'
import styles from './button.module.css'

export const TYPES = {
  PRIMARY: 'primary',
  WARNING: 'warning',
  DANGER: 'danger',
  SUCCESS: 'success',
}

export const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
}

export const Button = ({
  type,
  buttonType,
  buttonSize,
  onClick = () => {},
  children,
}) => {
  const btnClass = classNames(
    styles.button,
    styles[buttonType || TYPES.PRIMARY],
    styles[buttonSize || SIZES.MEDIUM]
  )
  return (
    <button type={type} onClick={onClick} className={btnClass}>
      {children}
    </button>
  )
}
