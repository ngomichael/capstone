import React from 'react'
import styles from './ValueProps.module.css'
import ValueProp from '../ValueProp/ValueProp'

const valueProps = [
  {
    title: 'Efficient',
    description:
      'Easily find and get matched to therapists who are open for new clients',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Simplified Process',
    description:
      'Presents information in an easy-to-understand manner and removes unnecessary information',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    title: 'Up-to-date Information',
    description:
      'Gives providers a quick and easy way to post their information and reminds them to update it',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
]

const ValueProps = () => {
  return (
    <div className={styles.container}>
      <div className={styles.descriptionContainer}>
        <h1 className={styles.title}>Why PearCare?</h1>
        <p className={styles.description}>
          Searching for mental health services and finding a provider that fits
          any given patient’s needs can be an overwhelming and time-consuming
          process. PearCare's matching algorithm intends to personalize every
          individual’s experience when searching for a provider
        </p>
      </div>
      <div className={styles.valuePropsContainer}>
        {valueProps.map(valueProp => (
          <ValueProp value={valueProp} key={valueProp.title} />
        ))}
      </div>
    </div>
  )
}

export default ValueProps
