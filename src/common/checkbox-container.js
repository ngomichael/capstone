import React from 'react'
import styles from './checkbox-container.module.css'
import PropTypes from 'prop-types'
import { Checkbox } from './checkbox2'
import { Button, TYPES, SIZES } from '../common/button'

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.handleCheckboxChange(e)
    this.props.onChange(e)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.checkboxes}>
          {this.props.options.map(item => (
            <label key={item} className={styles.checkboxOption}>
              <Checkbox
                name={item}
                onChange={this.handleChange}
                checked={this.props.allCheckedItems.get(item)}
              />
              <span className={styles.text}>{item}</span>
            </label>
          ))}
        </div>

        <div className={styles.applyButton}>
          <Button
            type="button"
            buttonType={TYPES.PRIMARY}
            buttonSize={SIZES.SMALL}
            onClick={this.props.onApplyFilter}
          >
            Apply
          </Button>
        </div>
      </div>
    )
  }
}

export default CheckboxContainer
