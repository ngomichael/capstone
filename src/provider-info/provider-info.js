import React, { useState, useEffect } from 'react'
import styles from './provider-info.module.css'
import { ONBOARDING_ROUTES } from '../constants/routes'
import { Video } from './video'
import { ContactModal } from './contact-modal'
import { BackButton } from '../common/back-button'
import { Button, TYPES, SIZES } from '../common/button'
import { Heart } from 'react-feather'
import firebase from '../firebase/firebase'
import AcceptingClientsIcon from '../icons/accepting-clients.png'

export const ProviderInfo = ({ providerId, location, prevPath }) => {
  useEffect(() => {
    getProviderInfo()
  }, {})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [provider, setProvider] = useState({})
  const [isSaved, setIsSaved] = useState(location.state.isSaved)

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
      <ContactModal
        website={provider.website}
        email={provider.email}
        name={provider.name}
        handleClose={handleClose}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        locationPathname={location.pathname}
      />

      {Object.entries(provider).length !== 0 && (
        <div className={styles.maxWidthContainer}>
          <div className={styles.providerOverviewBack}>
            <BackButton path={prevPath} />
            <div className={styles.providerOverview}>
              <div className={styles.basicInfo}>
                <img src={provider.photo} className={styles.providerPhoto} />
                <div>
                  <p className={styles.name}>{provider.name}</p>
                  <p>{provider.care_types.join(', ')}</p>
                  <p>{provider.credentials[0]}</p>

                  {provider.accepting_clients[0] === 'Yes' && (
                    <div className={styles.iconAndTagContainer}>
                      <img
                        src={AcceptingClientsIcon}
                        className={styles.acceptingClientsIcon}
                      />

                      <div className={styles.acceptingClientsTag}>
                        Accepting new clients
                      </div>
                    </div>
                  )}
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
              <p className={styles.sectionContent}>{provider.biography}</p>
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
                {provider.issues.length !== 0 && (
                  <ul className={styles.listContainer}>
                    <p>
                      <b>Issues</b>
                    </p>
                    {provider.issues.map(issue => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                )}
                {provider.age_groups.length !== 0 && (
                  <ul className={styles.listContainer}>
                    <p>
                      <b>Client Focus</b>
                    </p>
                    {provider.age_groups.map(age_group => (
                      <li key={age_group}>{age_group}</li>
                    ))}
                  </ul>
                )}

                {provider.populations.length !== 0 && (
                  <ul className={styles.listContainer}>
                    <p>
                      <b>Population</b>
                    </p>
                    {provider.populations.map(population => (
                      <li key={population}>{population}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.sectionContainer}>
              <p className={styles.sectionHeader}>
                Accepted Insurance(s), Cost, and Payment types
              </p>
              <p className={styles.sectionDescription}>
                Providers can accept a wide range of insurances and payment
                types which can affect how much an individual has to pay per
                session.
              </p>
              <div className={styles.sectionContent}>
                {provider.insurances.length !== 0 && (
                  <ul className={styles.listContainer}>
                    <p>
                      <b>Insurances</b>
                    </p>
                    {provider.insurances.map(insurance => (
                      <li key={insurance}>{insurance}</li>
                    ))}
                  </ul>
                )}
                {provider.cost.length !== 0 && (
                  <ul className={styles.listContainer}>
                    <p>
                      <b>Cost</b>
                    </p>
                    <p>{provider.cost}</p>
                  </ul>
                )}

                {provider.payment_type.length !== 0 && (
                  <ul className={styles.listContainer}>
                    <p>
                      <b>Payment types</b>
                    </p>
                    {provider.payment_type.map(payment_type => (
                      <li key={payment_type}>{payment_type}</li>
                    ))}
                  </ul>
                )}
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

            {/* <div className={styles.sectionContainer}>
              <p className={styles.sectionHeader}>Video</p>
              <p className={styles.sectionDescription}>
                Part of being able to form a successful working relationship
                with your provider is finding a provider who is a good fit with
                your personality and needs. Watch this video to see if you can
                envision yourself working with this provider.
              </p>
              <Video />
            </div> */}
          </div>
          <div className={styles.footer}>
            <div
              className={styles.leftSideActions}
              onClick={() => {
                isSaved
                  ? firebase.unfavoriteProvider(providerId)
                  : firebase.favoriteProvider(providerId)

                setIsSaved(!isSaved)
              }}
            >
              <Heart
                size={30}
                style={{
                  fill: isSaved && 'hsl(174, 74%, 39%)',
                }}
                className={styles.heartIcon}
              />
              <span className={styles.saveText}>Save Provider</span>
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
