import React, { useState } from 'react'
import styles from './provider-info.module.css'
import QuesionnaireHeader from '../questionnaire/questionnaire-header'
import Video from './video'
import ContactModal from './contact-modal'
import MorganMcCreaPhoto from '../images/morganmccrea.jpeg'
import StacyAdamsPhoto from '../images/Jen+Adams.jpeg'
import { Button, TYPES, SIZES } from '../common/button'

const ProviderInfo = () => {
  const [isOpen, setIsOpen] = useState(false)

  function handleClose() {
    setIsOpen(false)
  }

  function handleShowModal() {
    setIsOpen(true)
  }

  return (
    <div className={styles.container}>
      {isOpen && <ContactModal handleClose={handleClose} />}
      <QuesionnaireHeader step={2} />
      {/* Needs to be a link here to go back */}
      {/* <div className={styles.backButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <p>Back</p>
      </div> */}
      <div className={styles.providerCardContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={StacyAdamsPhoto} className={styles.providerPhoto} />
          <div>
            <p className={styles.name}>Stacy Adams</p>
            <p>ARNP, PMHNP-BC</p>
            <div className={styles.acceptingClientsTag}>
              {' '}
              Accepting new Clients
            </div>
          </div>
        </div>
        <div className={styles.contactInfo}>
          <p>(206) 382 1928</p>
          <p>stacyadams@mail.com</p>
          <a
            href="https://shipshapementalhealth.com"
            style={{ color: '#1aae9f' }}
          >
            https://shipshapementalhealth.com
          </a>
          <p>87384 NE 475th St, Seattle, WA 98472</p>
        </div>
      </div>
      <div className={styles.sectionsContainer}>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>
            Biography: Background and Education
          </p>
          {/* <p className={styles.sectionDescription}>
            Description of why this is important and would help a patient make a
            choice about wanting to work with this provider. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Mauris ex nibh,
          </p> */}
          <p className={styles.sectionContent}>
            I am a clinician located in the heart of Ballard. I grew up in rural
            Ohio as a shy and awkward kid, filling time with reading, gaming,
            and spending time with my family's golden retrievers. I attended The
            Ohio State University for both my undergraduate and graduate
            education. I moved to Seattle after graduate school where I met my
            wife Olivia out of a genuine love for the Pacific Northwest. These
            days, I can still be found reading (mostly Sci-Fi) and gaming
            (Board, Card, Computer, Console). I’ve also taken up kayaking around
            the city with my foldable kayak, and I find biking to be my
            preferred method of transportation.
          </p>
        </div>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>
            Specialties: Issues, Client Focus, and Identity/Population
          </p>
          <p className={styles.sectionDescription}>
            Providers often have different areas of expertise. Having a provider
            who has experience with what you're struggling with could enhance
            the quality of your care.
          </p>
          <p className={styles.sectionContent}>
            <p className={styles.sectionContent}>
              <b>Issues</b>: Trauma, PTSD, ADHD, Depression, Anxiety
            </p>
            <p className={styles.sectionContent}>
              <b>Identity/population focus</b>: Bisexual, Lesbian, Gay
            </p>
            <p className={styles.sectionContent}>
              <b>Client focus</b>: Adults, Young Adults
            </p>
          </p>
        </div>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>Treatment Approach</p>
          <p className={styles.sectionDescription}>
            Providers can use a wide range of approaches. If you're looking for
            a particular approach, that can narrow down the providers we think
            are a good fit for you.
          </p>
          <p className={styles.sectionContent}>
            During our sessions we will work together to understand what is
            working in your life through an evaluation and proceed to therapy
            when desired. Additionally, my approach also includes medication
            management so if that is a better solution to your needs, we will go
            that route.
          </p>
        </div>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionHeader}>Video</p>
          <div className={styles.videoSection}>
            <Video />
            <div style={{ marginLeft: '50px' }}>
              <p className={styles.sectionDescription}>
                Part of being able to form a successful working relationship
                with your provider is finding a provider who is a good fit with
                your personality and needs. Watch this video to see if you can
                envision yourself working with this provider.
              </p>
              {/* <p className={styles.sectionContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                ex nibh, dapibus eget commodo vitae, dictum vitae urna. Aenean
                eu nunc ac leo dictum vehicula. Nam quis viverra dui, in
                elementum dui. Phasellus posuere erat ante. Pellentesque quis
                eros vel nisi tincidunt consequat nec et ante. Vivamus interdum
                efficitur nunc, eget consequat nunc feugiat at. Pellentesque at
                turpis in neque elementum ultrices. In posuere justo a porta
                condimentum.
              </p> */}
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

        <Button
          type="button"
          onClick={handleShowModal}
          buttonType={TYPES.PRIMARY}
          buttonSize={SIZES.LARGE}
        >
          I'm interested in reaching out
        </Button>
      </div>
    </div>
  )
}

export default ProviderInfo
