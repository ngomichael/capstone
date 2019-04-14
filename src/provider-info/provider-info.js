import React, { useState } from 'react'
import styles from './provider-info.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { Video } from './video'
import { ContactModal } from './contact-modal'
import StacyAdamsPhoto from '../images/Jen+Adams.jpeg'
import { Button, TYPES, SIZES } from '../common/button'
import { Heart } from 'react-feather'

export const ProviderInfo = ({
  name,
  photo,
  credentials,
  isAcceptingClients,
  phone,
  email,
  website,
  address,
  specialties,
  approach,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleClose() {
    setIsModalOpen(false)
  }

  function handleShowModal() {
    setIsModalOpen(true)
  }

  return (
    <div className={styles.container}>
      {isModalOpen && <ContactModal handleClose={handleClose} />}
      <OnboardingHeader step={2} />
      {/* Needs to be a link here to go back */}
      <div className={styles.maxWidthContainer}>
        <div className={styles.providerOverview}>
          <div className={styles.basicInfo}>
            <img src={StacyAdamsPhoto} className={styles.providerPhoto} />
            <div>
              <p className={styles.name}>Stacy Adams</p>
              <p>ARNP, PMHNP-BC</p>
              <div className={styles.acceptingClientsTag}>
                Accepting new clients
              </div>
            </div>
          </div>
          <div className={styles.contactInfo}>
            <p className={styles.sectionHeader}>Contact Information</p>
            <div>
              <p>(206) 382 1928</p>
              <p>stacyadams@mail.com</p>
              <a
                href="https://shipshapementalhealth.com"
                className={styles.websiteLink}
              >
                https://shipshapementalhealth.com
              </a>
              <p>87384 NE 475th St, Seattle, WA 98472</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionsContainer}>
          <div className={styles.sectionContainer}>
            <p className={styles.sectionHeader}>
              Biography: Background and Education
            </p>
            <p className={styles.sectionDescription}>
              Description of why this is important and would help a patient make
              a choice about wanting to work with this provider. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Mauris ex nibh,
            </p>
            <p className={styles.sectionContent}>
              I am a clinician located in the heart of Ballard. I grew up in
              rural Ohio as a shy and awkward kid, filling time with reading,
              gaming, and spending time with my family's golden retrievers. I
              attended The Ohio State University for both my undergraduate and
              graduate education. I moved to Seattle after graduate school where
              I met my wife Olivia out of a genuine love for the Pacific
              Northwest. These days, I can still be found reading (mostly
              Sci-Fi) and gaming (Board, Card, Computer, Console). I’ve also
              taken up kayaking around the city with my foldable kayak, and I
              find biking to be my preferred method of transportation.
            </p>
          </div>
          <div className={styles.sectionContainer}>
            <p className={styles.sectionHeader}>
              Specialties: Issues, Client Focus, and Identity/Population
            </p>
            <p className={styles.sectionDescription}>
              Providers often have different areas of expertise. Having a
              provider who has experience with what you're struggling with could
              enhance the quality of your care.
            </p>
            <p className={styles.sectionContent}>
              During our sessions we will work together to understand what is
              working in your life through an evaluation and proceed to therapy
              when desired. Additionally, my approach also includes medication
              management so if that is a better solution to your needs, we will
              go that route.
            </p>
          </div>
          <div className={styles.sectionContainer}>
            <p className={styles.sectionHeader}>Treatment Approach</p>
            <p className={styles.sectionDescription}>
              Providers can use a wide range of approaches. If you're looking
              for a particular approach, that can narrow down the providers we
              think are a good fit for you.
            </p>
            <p className={styles.sectionContent}>
              During our sessions we will work together to understand what is
              working in your life through an evaluation and proceed to therapy
              when desired. Additionally, my approach also includes medication
              management so if that is a better solution to your needs, we will
              go that route.
            </p>
          </div>
          <div className={styles.sectionContainer}>
            <p className={styles.sectionHeader}>Video</p>
            <p className={styles.sectionDescription}>
              Part of being able to form a successful working relationship with
              your provider is finding a provider who is a good fit with your
              personality and needs. Watch this video to see if you can envision
              yourself working with this provider.
            </p>
            <Video />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.leftSideActions}>
            <Heart size={30} className={styles.favorite} />
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
    </div>
  )
}
