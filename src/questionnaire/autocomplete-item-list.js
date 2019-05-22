import React, { Component } from 'react'
import styles from './autocomplete-item-list.module.css'

const createTermsList = term => {
  return (
    <li key={term} tabIndex="0" aria-label={term} className={styles.listItem}>
      <p aria-label={term} className={styles.term}>
        {term}
      </p>
    </li>
  )
}

class AutocompleteItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: true,
    }
  }

  render() {
    const { terms } = this.props
    const noResults = 'No terms found with that name'
    return (
      <ul className={this.state.showList ? styles.list : styles.listHidden}>
        {terms.length > 0
          ? terms.map(term => createTermsList(term))
          : createTermsList(noResults)}
      </ul>
    )
  }
}

export default AutocompleteItemList
