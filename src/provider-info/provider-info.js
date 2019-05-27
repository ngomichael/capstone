import React, { useState, useEffect } from 'react'
import styles from './provider-info.module.css'
import { OnboardingHeader } from '../common/onboarding-header'
import { Video } from './video'
import { ContactModal } from './contact-modal'
import { BackButton } from '../common/back-button'
import { Button, TYPES, SIZES } from '../common/button'
import { Heart } from 'react-feather'
import firebase from '../firebase/firebase'
import AcceptingClientsIcon from '../icons/accepting-clients.png'

export const ProviderInfo = ({ providerId }) => {
  useEffect(() => {
    getProviderInfo()
  }, {})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [provider, setProvider] = useState({})

  async function getProviderInfo() {
    const snapshot = await firebase.getProviderInfo(providerId)
    setProvider(snapshot.docs.map(doc => doc.data())[0])
  }

  function handleClose() {
    setIsModalOpen(false)
  }

  function handleShowModal() {
    setIsModalOpen(true)
  }

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <ContactModal
          website={provider.website}
          email={provider.email}
          name={provider.name}
          handleClose={handleClose}
        />
      )}
      {/* <OnboardingHeader step={2} /> */}
      {Object.entries(provider).length !== 0 && (
        <div className={styles.maxWidthContainer}>
          <div className={styles.providerOverviewBack}>
            <BackButton path="/onboardingTracker/results" />
            <div className={styles.providerOverview}>
              <div className={styles.basicInfo}>
                <img src={provider.photo} className={styles.providerPhoto} />
                <div>
                  <p className={styles.name}>{provider.name}</p>
                  <p>{provider.care_types.join(', ')}</p>
                  <p>{provider.credentials}</p>
                  <div className={styles.iconAndTagContainer}>
                    {provider.accepting_clients && (
                      <img
                        src={AcceptingClientsIcon}
                        className={styles.acceptingClientsIcon}
                      />
                    )}
                    <div className={styles.acceptingClientsTag}>
                      Accepting new clients
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.contactInfo}>
                <p className={styles.sectionHeader}>Contact Information</p>
                <div>
                  <p>{provider.phone_number}</p>
                  {provider.email && <p>{provider.email}</p>}
                  {provider.website && (
                    <a
                      href={provider.website}
                      rel="noopener noreferrer"
                      target="_blank"
                      className={styles.websiteLink}
                    >
                      {provider.website}
                    </a>
                  )}
                  <p>{provider.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sectionsContainer}>
            <div className={styles.sectionContainer}>
              <p className={styles.sectionHeader}>
                Biography: Background and Education
              </p>
              <p className={styles.sectionDescription}>
                Part of finding a provider that will fit you well is about
                figuring out if you're able to relate and if they are able to
                fully understand your situation.
              </p>
              <p className={styles.sectionContent}>
                I am a clinician located in the heart of Ballard. I grew up in
                rural Ohio as a shy and awkward kid, filling time with reading,
                gaming, and spending time with my family's golden retrievers. I
                attended The Ohio State University for both my undergraduate and
                graduate education. I moved to Seattle after graduate school
                where I met my wife Olivia out of a genuine love for the Pacific
                Northwest. These days, I can still be found reading (mostly
                Sci-Fi) and gaming (Board, Card, Computer, Console). I’ve also
                taken up kayaking around the city with my foldable kayak, and I
                find biking to be my preferred method of transportation.
              </p>
            </div>
            <div className={styles.sectionContainer}>
              <p className={styles.sectionHeader}>Accepted Insurance(s)</p>
              <p className={styles.sectionDescription}>
                Instantly break out into full speed gallop across the house for
                no reason meeeeouw for purr as loud as possible, be the most
                annoying cat that you can, and, knock everything off the table
                for stare out cat door then go back inside.
              </p>
              <div className={styles.sectionContent}>
                <ul className={styles.listContainer}>
                  {provider.insurances.map(insurance => (
                    <li key={insurance}>{insurance}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.sectionContainer}>
              <p className={styles.sectionHeader}>
                Specialties: Issues, Client Focus, and Identity/Population
              </p>
              <p className={styles.sectionDescription}>
                Providers often have different areas of expertise. Having a
                provider who has experience with what you're struggling with
                could enhance the quality of your care.
              </p>

              <div className={styles.sectionContent}>
                <ul className={styles.listContainer}>
                  <p>
                    <b>Issues</b>
                  </p>
                  {provider.issues.map(issue => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
                <ul className={styles.listContainer}>
                  <p>
                    <b>Client Focus</b>
                  </p>
                  {provider.age_groups.map(age_group => (
                    <li key={age_group}>{age_group}</li>
                  ))}
                </ul>

                <ul className={styles.listContainer}>
                  <p>
                    <b>Population</b>
                  </p>
                  {provider.populations.map(population => (
                    <li key={population}>{population}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.sectionContainer}>
              <p className={styles.sectionHeader}>Treatment Approach</p>
              <p className={styles.sectionDescription}>
                Providers can use a wide range of approaches. If you're looking
                for a particular approach, that can narrow down the providers we
                think are a good fit for you.
              </p>
              <div className={styles.sectionContent}>
                <ul className={styles.listContainer}>
                  {provider.approaches.map(approach => (
                    <li key={approach}>{approach}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.sectionContainer}>
              <p className={styles.sectionHeader}>Video</p>
              <p className={styles.sectionDescription}>
                Part of being able to form a successful working relationship
                with your provider is finding a provider who is a good fit with
                your personality and needs. Watch this video to see if you can
                envision yourself working with this provider.
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
      )}
    </div>
  )
}
