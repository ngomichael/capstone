import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import AutocompleteItemList from './autocomplete-item-list'
import Autocomplete from 'react-autocomplete'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

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
  const [multiValue, setMultiValue] = useState([])

  const handleMultiChange = option => {
    // console.log(option)
    setMultiValue(option)
    setFieldValue(name, option)
  }

  return (
    // <div>
    //   <div>
    //     <p className={styles.supplementaryText}>{supplementaryText}</p>
    //     <Autocomplete
    //       items={terms}
    //       shouldItemRender={(item, inputText) =>
    //         item.label.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    //       }
    //       getItemValue={item => item.label}
    //       renderItem={(item, isHighlighted) => (
    //         <div
    //           key={item.id}
    //           className={
    //             isHighlighted ? styles.highlightedListItem : styles.listItem
    //           }
    //         >
    //           {item.label}
    //         </div>
    //       )}
    //       // value={inputText}
    //       value={values[name]}
    //       // zip_code: '',
    //       //     issues: '',
    //       //     insurances: '',
    //       //     credentials: '',
    //       //     approaches: '',
    //       //     populations: '',
    //       // onChange={e => setInputText(e.target.value)}
    //       // onSelect={val => setInputText(val)}
    //       onChange={e => setFieldValue(name, e.target.value)}
    //       onSelect={val => setFieldValue(name, val)}
    //       inputProps={{ className: styles.input }}
    //     />
    //   </div>
    // </div>
    <Select
      components={makeAnimated()}
      isMulti
      name={name}
      options={terms}
      value={multiValue}
      onChange={handleMultiChange}
    />
  )
}

AutocompleteField.propTypes = {
  supplementaryText: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  isLongInput: PropTypes.bool,
}
