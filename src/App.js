import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styles from './App.module.css'
import Counter from './counter/Counter'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <h1> Hello, World! Welcome!</h1>
        <Counter />
      </div>
    )
  }
}

export default hot(module)(App)
