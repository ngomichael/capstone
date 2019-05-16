import React from 'react'
import styles from './checkbox-container.module.css'
import PropTypes from 'prop-types'
import { Checkbox } from './checkbox2'

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedItems: new Map(),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const item = e.target.name
    const isChecked = e.target.checked
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }))
    this.props.onChange(item, isChecked)
  }

  render() {
    console.log(this.state.checkedItems)
    return (
      <div className={styles.container}>
        {this.props.options.map(item => (
          <label key={item} className={styles.checkboxOption}>
            <Checkbox
              name={item}
              onChange={this.handleChange}
              checked={this.state.checkedItems.get(item)}
            />
            <span className={styles.text}>{item}</span>
          </label>
        ))}
      </div>
    )
  }
}

export default CheckboxContainer
