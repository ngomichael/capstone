import React, { useState, useEffect } from 'react'
import styles from './matched-providers.module.css'
import { ProviderCard } from './provider-card'
import { OnboardingHeader } from '../common/onboarding-header'
import { OptionButton } from '../common/option-button'
import Therapist1 from '../images/Therapist1.jpeg'
import Therapist2 from '../images/Therapist2.jpeg'
import JenAdamsPhoto from '../images/Jen+Adams.jpeg'
import { Button, TYPES, SIZES } from '../common/button'
import firebase from '../firebase/firebase'

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
  },
]

const filters = [
  {
    name: 'Depression, Anxiety',
    isClicked: true,
  },
  {
    name: 'Therapy',
    isClicked: true,
  },
  {
    name: 'Aetna',
    isClicked: true,
  },
  {
    name: 'Young Adult',
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
  const [allProviders, setAllProviders] = useState([])

  useEffect(() => {
    getProviders()
  }, [])

  function handleSearchValChange(e) {
    setSearchVal(e.target.value)
  }

  async function getProviders() {
    const snapshot = await firebase.getAllProviders()
    setAllProviders(snapshot.docs.map(doc => doc.data()))
  }

  return (
    <div className={styles.container}>
      <OnboardingHeader step={2} />
      <div className={styles.maxWidthContainer}>
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
            <OptionButton isClicked={filter.isClicked} key={filter.name}>
              {filter.name}
            </OptionButton>
          ))}
        </div>

        <div className={styles.providersContainer}>
          {allProviders.map(provider => (
            <ProviderCard provider={provider} key={provider.name} />
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
        <div style={{ marginBottom: '35px' }} />
      </div>
    </div>
  )
}
