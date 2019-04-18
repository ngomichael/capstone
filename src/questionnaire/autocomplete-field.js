import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import AutocompleteItemList from './autocomplete-item-list'
import Autocomplete from 'react-autocomplete'

import styles from './autocomplete-field.module.css'

// const termBank = [
//   'Hello',
//   'Michael',
//   'Jessica',
//   'Benny',
//   'Chris',
//   'Justin',
//   'JJ',
//   'Ngo',
// ]

export const AutocompleteField = ({
  supplementaryText = false,
  terms,
  type,
  name,
  isLongInput,
  setFieldValue,
  values,
}) => {
  const [inputText, setInputText] = useState('')
  console
  return (
    <div>
      <div>
        <p className={styles.supplementaryText}>{supplementaryText}</p>
        <Autocomplete
          items={terms}
          shouldItemRender={(item, inputText) =>
            item.label.toLowerCase().indexOf(inputText.toLowerCase()) > -1
          }
          getItemValue={item => item.label}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.id}
              className={
                isHighlighted ? styles.highlightedListItem : styles.listItem
              }
            >
              {item.label}
            </div>
          )}
          // value={inputText}
          value={values[name]}
          // zip_code: '',
          //     issues: '',
          //     insurances: '',
          //     credentials: '',
          //     approaches: '',
          //     populations: '',
          // onChange={e => setInputText(e.target.value)}
          // onSelect={val => setInputText(val)}
          onChange={e => setFieldValue(name, e.target.value)}
          onSelect={val => setFieldValue(name, val)}
          inputProps={{ className: styles.input }}
        />
      </div>
    </div>
  )
}

AutocompleteField.propTypes = {
  supplementaryText: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  isLongInput: PropTypes.bool,
}
