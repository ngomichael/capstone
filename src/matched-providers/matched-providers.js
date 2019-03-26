import React, { useState } from 'react'
import styles from './matched-providers.module.css'
import { ProviderCard } from './provider-card'
import { OnboardingHeader } from '../common/onboarding-header'
import { OptionButton } from '../common/option-button'
import Therapist1 from '../images/Therapist1.jpeg'
import Therapist2 from '../images/Therapist2.jpeg'
import JenAdamsPhoto from '../images/Jen+Adams.jpeg'
import { Button, TYPES, SIZES } from '../common/button'

const providers = [
  {
    name: 'Stacy Adams',
    photo: JenAdamsPhoto,
    credentials: 'ARNP, PMHNP-BC',
    isAcceptingClients: true,
    phone: '(206) 382 1928',
    email: 'stacyadams@mail.com',
    website: 'https://shipshapementalhealth.com',
    address: '87384 NE 475th St, Seattle, WA 98472',
    biography:
      "I am a clinician located in the heart of Ballard. I grew up in rural Ohio as a shy and awkward kid, filling time with reading, gaming, and spending time with my family's golden retrievers. I attended The Ohio State University for both my undergraduate and graduate education. I moved to Seattle after graduate school where I met my wife Olivia out of a genuine love for the Pacific Northwest. These days, I can still be found reading (mostly Sci-Fi) and gaming (Board, Card, Computer, Console). I’ve also taken up kayaking around the city with my foldable kayak, and I find biking to be my preferred method of transportation.",
    specialties:
      "Providers often have different areas of expertise. Having a provider who has experience with what you're struggling with could enhance the quality of your care.",
    approach:
      'During our sessions we will work together to understand what is working in your life through an evaluation and proceed to therapy when desired. Additionally, my approach also includes medication management so if that is a better solution to your needs, we will go that route.',
    summary:
      '"We will work together to understand what is working in your life through an evaluation and proceed to therapy when desired,"',
  },
  {
    name: 'Regina Aiko',
    photo: Therapist1,
    credentials: 'LICSW',
    isAcceptingClients: true,
    phone: '(206) 382 1928',
    email: 'stacyadams@mail.com',
    website: 'https://shipshapementalhealth.com',
    address: '87384 NE 475th St, Seattle, WA 98472',
    biography:
      "I am a clinician located in the heart of Ballard. I grew up in rural Ohio as a shy and awkward kid, filling time with reading, gaming, and spending time with my family's golden retrievers. I attended The Ohio State University for both my undergraduate and graduate education. I moved to Seattle after graduate school where I met my wife Olivia out of a genuine love for the Pacific Northwest. These days, I can still be found reading (mostly Sci-Fi) and gaming (Board, Card, Computer, Console). I’ve also taken up kayaking around the city with my foldable kayak, and I find biking to be my preferred method of transportation.",
    specialties:
      "Providers often have different areas of expertise. Having a provider who has experience with what you're struggling with could enhance the quality of your care.",
    approach:
      'During our sessions we will work together to understand what is working in your life through an evaluation and proceed to therapy when desired. Additionally, my approach also includes medication management so if that is a better solution to your needs, we will go that route.',
    summary:
      '"We will go into the depth of your mind and try to originate the feelings you have today and why you have those feelings and thoughts."',
  },
  {
    name: 'Glen Coco',
    photo: Therapist2,
    credentials: 'PsyD',
    isAcceptingClients: true,
    phone: '(206) 382 1928',
    email: 'stacyadams@mail.com',
    website: 'https://shipshapementalhealth.com',
    address: '87384 NE 475th St, Seattle, WA 98472',
    biography:
      "I am a clinician located in the heart of Ballard. I grew up in rural Ohio as a shy and awkward kid, filling time with reading, gaming, and spending time with my family's golden retrievers. I attended The Ohio State University for both my undergraduate and graduate education. I moved to Seattle after graduate school where I met my wife Olivia out of a genuine love for the Pacific Northwest. These days, I can still be found reading (mostly Sci-Fi) and gaming (Board, Card, Computer, Console). I’ve also taken up kayaking around the city with my foldable kayak, and I find biking to be my preferred method of transportation.",
    specialties:
      "Providers often have different areas of expertise. Having a provider who has experience with what you're struggling with could enhance the quality of your care.",
    approach:
      'During our sessions we will work together to understand what is working in your life through an evaluation and proceed to therapy when desired. Additionally, my approach also includes medication management so if that is a better solution to your needs, we will go that route.',
    summary:
      '"I will guid you to the right direction with a personalized diagnoses. We will always understand what you are struggling with and how you want to seek solutions."',
  },
]

const filters = [
  {
    name: 'Depression, anxiety',
    isClicked: true,
  },
  {
    name: 'Therapy',
    isClicked: true,
  },
  {
    name: 'Apple Health',
    isClicked: true,
  },
  {
    name: 'Young adult',
    isClicked: true,
  },
  {
    name: 'Credentials',
    isClicked: false,
  },
  {
    name: 'Approach',
    isClicked: false,
  },
  {
    name: 'Personality',
    isClicked: false,
  },
  {
    name: 'Identity/Population',
    isClicked: false,
  },
]

export const MatchedProviders = () => {
  const [searchVal, setSearchVal] = useState('')
  const [isOpen, setIsOpen] = useState(true)

  function handleSearchValChange(e) {
    setSearchVal(e.target.value)
  }

  function handleClose() {
    setIsOpen(false)
  }
  return (
    <div className={styles.container}>
      <OnboardingHeader step={2} />
      {isOpen && (
        <div className={styles.alertContainer}>
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
            className={styles.closeButton}
            onClick={handleClose}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>

          <h1 className={styles.alertHeader}>
            Here are providers you might like. View their pages to find out the
            best ways to contact them
          </h1>
          <p>
            Below are a list of providers curated to fit your needs. Read their
            bios to get to know them better, favorite them for to save later,
            and adjust filters if needed. Once you feel that you found a
            provider you want to work with, contact them via the phone, email,
            or intake form they specified in their bio.
          </p>
        </div>
      )}
      <div className={styles.titleAndSearchContainer}>
        <h1>Providers for you</h1>
        <input
          value={searchVal}
          onChange={handleSearchValChange}
          placeholder="Search for a location or keyword"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.filtersContainer}>
        {filters.map(filter => (
          <OptionButton isClicked={filter.isClicked}>
            {filter.name}
          </OptionButton>
        ))}
      </div>
      <div className={styles.providersContainer}>
        {providers.map(provider => (
          <ProviderCard provider={provider} />
        ))}
      </div>
      <p className={styles.pageInfo}>1-3 of 18 results</p>
      <Button
        type="button"
        buttonType={TYPES.PRIMARY}
        buttonSize={SIZES.MEDIUM}
      >
        View more matches
      </Button>
    </div>
  )
}
