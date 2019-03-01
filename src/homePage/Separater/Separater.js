import React from 'react'
import styles from './Separater.module.css'
import { Element } from 'react-scroll'

const Separater = ({ name }) => {
  return <Element name={name} className={styles.line} />
}

export default Separater
