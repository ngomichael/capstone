import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './care-type-card.module.css'

export const CareTypeCard = ({ name, description }) => {
  const [isCardClicked, setIsCardClicked] = useState(false)

  function handleCardClicked() {
    setIsCardClicked(!isCardClicked)
  }
  return (
    <div
      className={
        isCardClicked ? styles.activeCareTypeCard : styles.careTypeCardContainer
      }
      onClick={handleCardClicked}
    >
      <p
        className={
          isCardClicked ? styles.activeCareTypeName : styles.careTypeCardName
        }
      >
        {name}
      </p>
      <p className={styles.careTypeCardDescription}>{description}</p>
    </div>
  )
}

CareTypeCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
