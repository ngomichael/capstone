import React from 'react'
import styles from './checkbox-container.module.css'
import PropTypes from 'prop-types'
import { Checkbox } from './checkbox2'

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.options.map(item => (
          <label key={item} className={styles.checkboxOption}>
            <Checkbox
              name={item}
              onChange={this.props.onChange}
              checked={this.props.checkedItems.get(item)}
            />
            <span className={styles.text}>{item}</span>
          </label>
        ))}
      </div>
    )
  }
}

export default CheckboxContainer
