import React from 'react'
import styles from './Questionnaire.module.css'
import ProviderModel from './ProviderModal'

const Questionnaire = props => {
  return (
    <div className={styles.container}>
      <ProviderModel />
    </div>
  )
}

export default Questionnaire
