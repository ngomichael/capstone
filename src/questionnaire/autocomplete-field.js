import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

import styles from './autocomplete-field.module.css'

export const AutocompleteField = ({
  supplementaryText,
  terms,
  name,
  setFieldValue,
}) => {
  const [multiValue, setMultiValue] = useState([])

  const handleMultiChange = option => {
    setMultiValue(option)
    setFieldValue(name, option)
  }

  return (
    <div>
      <p className={styles.supplementaryText}>{supplementaryText}</p>
      <Select
        components={makeAnimated()}
        isMulti
        name={name}
        options={terms}
        value={multiValue}
        onChange={handleMultiChange}
        className={styles.input}
        // defaultInputValue="Michael"
      />
    </div>
  )
}

AutocompleteField.propTypes = {
  supplementaryText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  terms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }).isRequired
  ),
}
