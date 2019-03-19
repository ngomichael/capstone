import React from 'react'
import { Field, ErrorMessage } from 'formik'

import styles from './checkbox.module.css'

const Checkbox = props => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label className={styles.container}>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  value => value !== props.value
                )
                form.setFieldValue(props.name, nextValue)
              } else {
                const nextValue = field.value.concat(props.value)
                form.setFieldValue(props.name, nextValue)
              }
            }}
            className={styles.checkbox}
          />
          <p className={styles.optionName}>{props.value}</p>
        </label>
      )}
    </Field>
  )
}

export default Checkbox
