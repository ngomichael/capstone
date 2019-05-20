import React from 'react'
import styles from './checkbox-container.module.css'
import PropTypes from 'prop-types'
import { Checkbox } from './checkbox2'
import { Button, TYPES, SIZES } from '../common/button'

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMoreFilters: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.createCheckboxes = this.createCheckboxes.bind(this)
  }

  handleChange(e) {
    this.props.handleCheckboxChange(e)
    this.props.onChange(e)
  }

  createCheckboxes() {
    const shownFilters = this.props.options.slice(0, 4).map((item, idx) => (
      <label key={item} className={styles.checkboxOption}>
        <Checkbox
          name={item}
          onChange={this.handleChange}
          checked={this.props.allCheckedItems.get(item)}
        />
        <span className={styles.text}>{item}</span>
      </label>
    ))

    const hiddenFilters = this.props.options.slice(4).map((item, idx) => (
      <label key={item} className={styles.checkboxOption}>
        <Checkbox
          name={item}
          onChange={this.handleChange}
          checked={this.props.allCheckedItems.get(item)}
        />
        <span className={styles.text}>{item}</span>
      </label>
    ))
  }

  handleShowMore() {}

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.checkboxes}>
          {this.props.options.slice(0, 4).map(item => (
            <label key={item} className={styles.checkboxOption}>
              <Checkbox
                name={item}
                onChange={this.handleChange}
                checked={this.props.allCheckedItems.get(item)}
              />
              <span className={styles.text}>{item}</span>
            </label>
          ))}
          {this.props.options.slice(4).map(item => (
            <label
              key={item}
              className={
                this.state.showMoreFilters
                  ? styles.checkboxOption
                  : styles.checkboxOptionHidden
              }
            >
              <Checkbox
                name={item}
                onChange={this.handleChange}
                checked={this.props.allCheckedItems.get(item)}
              />
              <span className={styles.text}>{item}</span>
            </label>
          ))}
        </div>
        {this.props.options.length > 4 && (
          <p
            onClick={() =>
              this.setState({ showMoreFilters: !this.state.showMoreFilters })
            }
            className={styles.showMoreButton}
          >
            {this.state.showMoreFilters ? 'Show less -' : 'Show more +'}
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
