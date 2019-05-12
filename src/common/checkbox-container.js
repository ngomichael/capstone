import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from './checkbox2'

// const checkboxes = [
//   {
//     name: 'check-box-1',
//     key: 'checkBox1',
//   },
//   {
//     name: 'check-box-2',
//     key: 'checkBox2',
//   },
//   {
//     name: 'check-box-3',
//     key: 'checkBox3',
//   },
//   {
//     name: 'check-box-4',
//     key: 'checkBox4',
//   },
// ]

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
  }

  render() {
    console.log([...this.state.checkedItems.keys()])
    return (
      <React.Fragment>
        {this.props.options.map(item => (
          <label key={item}>
            <Checkbox
              name={item}
              checked={this.state.checkedItems.get(item)}
              onChange={this.handleChange}
            />
            {item}
          </label>
        ))}
      </React.Fragment>
    )
  }
}

export default CheckboxContainer
