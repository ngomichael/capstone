import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styles from './App.module.css'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <h1> Hello, World!</h1>
      </div>
    )
  }
}

export default hot(module)(App)
