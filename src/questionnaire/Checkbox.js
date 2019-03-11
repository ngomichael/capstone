import React from 'react'
import { Field, ErrorMessage } from 'formik'

import styles from './Checkbox.module.css'

const Checkbox = props => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
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
          />
          {props.value}
          {console.log(field)}
          {/* {console.log(field.value.includes('Hello'))} */}
        </label>
      )}
    </Field>
  )
}

export default Checkbox