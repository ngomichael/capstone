import React from 'react'
import styles from './Questionnaire.module.css'
import ProviderModal from './ProviderModal'
import IllnessModal from './IllnessModal'

const Questionnaire = props => {
  return (
    <div className={styles.container}>
      <IllnessModal />
    </div>
  )
}

export default Questionnaire
