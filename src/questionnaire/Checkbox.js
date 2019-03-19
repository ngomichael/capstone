import React from 'react'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'
import styles from './checkbox.module.css'

export const Checkbox = ({ name, value }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <label className={styles.container}>
          <input
            type="checkbox"
            checked={field.value.includes(value)}
            onChange={() => {
              if (field.value.includes(value)) {
                const nextValue = field.value.filter(value => value !== value)
                form.setFieldValue(name, nextValue)
              } else {
                const nextValue = field.value.concat(value)
                form.setFieldValue(name, nextValue)
              }
            }}
            className={styles.checkbox}
          />
          <p className={styles.optionName}>{value}</p>
        </label>
      )}
    </Field>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
