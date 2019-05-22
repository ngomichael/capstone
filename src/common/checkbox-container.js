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
  }

  handleChange(e) {
    this.props.handleCheckboxChange(e)
    this.props.onChange(e)
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
          {/* <div className={styles.gradient} /> */}
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
          {/* {this.props.options.map(item => (
            <label key={item} className={styles.checkboxOption}>
              <Checkbox
                name={item}
                onChange={this.handleChange}
                checked={this.props.allCheckedItems.get(item)}
              />
              <span className={styles.text}>{item}</span>
            </label>
          ))}*/}
        </div>
        {/* {this.props.options.length > 4 && (
          <p
            onClick={() =>
              this.setState({ showMoreFilters: !this.state.showMoreFilters })
            }
            className={styles.showMoreButton}
          >
            {this.state.showMoreFilters ? 'Show less -' : 'Show more +'}
          </p>
        )} */}
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
