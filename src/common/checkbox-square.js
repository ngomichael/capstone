import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './checkbox-square.module.css'

export const CheckboxSquare = ({
  type = 'checkbox',
  name,
  checked = false,
  onCheckboxClick,
  description,

  // setFieldValue,
}) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div
      //   name={name}
      //   onChange={e => onChange(e, isChecked)}
      onClick={() => {
        onCheckboxClick(isChecked)
        setIsChecked(!isChecked)
      }}
      className={isChecked ? styles.checkedContainer : styles.container}
    >
      <p className={isChecked ? styles.checkedName : styles.name}>{name}</p>
      <p>{description}</p>
      {/* <input type={type} name={name} checked={checked} onChange={onChange} /> */}
    </div>
  )
}

CheckboxSquare.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
}
