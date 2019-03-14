import React from 'react'
import styles from './ProviderInfo.module.css'
import QuesionnaireHeader from '../questionnaire/QuestionnaireHeader'
import Video from './Video'

const ProviderInfo = () => {
  return (
    <div className={styles.container}>
      <QuesionnaireHeader step={2} />
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
    </div>
  )
}

export default ProviderInfo
