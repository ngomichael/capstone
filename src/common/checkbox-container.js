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
    this.props.handleCheckboxChangeOptionButton(e)
    this.props.handleCheckboxChangeMatchedProviders(e)
  }

  render() {
    return (
      <div className={styles.container}>
        <div
          className={
            this.props.options.length > 3
              ? styles.checkboxesScroll
              : styles.checkboxes
          }
        >
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

        {[...this.props.allCheckedItems.values()].includes(true) && (
          <p
            onClick={() => {
              this.props.handleClearFilters()
              this.props.onApplyFilter()
            }}
            className={styles.clearButton}
          >
            {[...this.props.allCheckedItems.values()].length !== 0
              ? 'Clear'
              : null}
          </p>
        )}

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
