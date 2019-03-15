import React, { useState } from 'react'
import styles from './ProviderInfo.module.css'
import QuesionnaireHeader from '../questionnaire/QuestionnaireHeader'
import Video from './Video'
import ContactModal from './ContactModal'

const ProviderInfo = () => {
  const [isOpen, setIsOpen] = useState(true)

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <div className={styles.container}>
      {/* {isOpen && <ContactModal handleClose={handleClose} />} */}
      <QuesionnaireHeader step={2} />
      {/* Needs to be a link here to go back */}
      <div className={styles.backButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <p>Back</p>
      </div>
      <div className={styles.providerCardContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.providerPhoto} />
          <div>
            <p className={styles.name}>Captain Marvel</p>
            <p>Therapy, PhD, LICSW</p>
            <div> Accepting new Clients</div>
          </div>
        </div>
        <div className={styles.contactInfo}>
          <p>(206) 382 1928</p>
          <p>firstnamelastname@mail.com</p>
          <p>website.com</p>
          <p>87384 NE 475th St, Seattle, WA 98472</p>
        </div>
      </div>
      <div className={styles.sectionsContainer}>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>
            Biography: Background and Education
          </p>
          <p className={styles.sectionDescription}>
            Description of why this is important and would help a patient make a
            choice about wanting to work with this provider. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Mauris ex nibh,
          </p>
          <p className={styles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex
            nibh, dapibus eget commodo vitae, dictum vitae urna. Aenean eu nunc
            ac leo dictum vehicula. Nam quis viverra dui, in elementum dui.
            Phasellus posuere erat ante. Pellentesque quis eros vel nisi
            tincidunt consequat nec et ante. Vivamus interdum efficitur nunc,
            eget consequat nunc feugiat at. Pellentesque at turpis in neque
            elementum ultrices. In posuere justo a porta condimentum.
          </p>
        </div>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>
            Specialties: Issues, Client Focus, and Identity/Population
          </p>
          <p className={styles.sectionDescription}>
            Description of why this is important and would help a patient make a
            choice about wanting to work with this provider. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Mauris ex nibh,
          </p>
          <p className={styles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex
            nibh, dapibus eget commodo vitae, dictum vitae urna. Aenean eu nunc
            ac leo dictum vehicula. Nam quis viverra dui, in elementum dui.
            Phasellus posuere erat ante. Pellentesque quis eros vel nisi
            tincidunt consequat nec et ante. Vivamus interdum efficitur nunc,
            eget consequat nunc feugiat at. Pellentesque at turpis in neque
            elementum ultrices. In posuere justo a porta condimentum.
          </p>
        </div>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>Treatment Approach</p>
          <p className={styles.sectionDescription}>
            Description of why this is important and would help a patient make a
            choice about wanting to work with this provider. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Mauris ex nibh,
          </p>
          <p className={styles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex
            nibh, dapibus eget commodo vitae, dictum vitae urna. Aenean eu nunc
            ac leo dictum vehicula. Nam quis viverra dui, in elementum dui.
            Phasellus posuere erat ante. Pellentesque quis eros vel nisi
            tincidunt consequat nec et ante. Vivamus interdum efficitur nunc,
            eget consequat nunc feugiat at. Pellentesque at turpis in neque
            elementum ultrices. In posuere justo a porta condimentum.
          </p>
        </div>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>Video</p>
          <div className={styles.videoSection}>
            <Video />
            <div style={{ marginLeft: '50px' }}>
              <p className={styles.sectionDescription}>
                Description of why this is important and would help a patient
                make a choice about wanting to work with this provider. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex
                nibh,
              </p>
              <p className={styles.sectionContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                ex nibh, dapibus eget commodo vitae, dictum vitae urna. Aenean
                eu nunc ac leo dictum vehicula. Nam quis viverra dui, in
                elementum dui. Phasellus posuere erat ante. Pellentesque quis
                eros vel nisi tincidunt consequat nec et ante. Vivamus interdum
                efficitur nunc, eget consequat nunc feugiat at. Pellentesque at
                turpis in neque elementum ultrices. In posuere justo a porta
                condimentum.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.leftSideActions}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1AAE9F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '20px', marginLeft: '20px' }}
            className={styles.favorite}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <a
            href="https://www.google.com"
            rel="noreferrer noopener"
            target="_blank"
            style={{ color: '#149184' }}
          >
            Get Directions
          </a>
        </div>
        <button className={styles.interestedButton}>
          I'm interested in reaching out
        </button>
      </div>
    </div>
  )
}

export default ProviderInfo
