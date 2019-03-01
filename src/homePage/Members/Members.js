import React from 'react'
import styles from './Members.module.css'
import michaelPhoto from '../../images/michael.png'
import krystalPhoto from '../../images/krystal.png'
import christinePhoto from '../../images/christine.png'
import danielPhoto from '../../images/daniel.png'
import Member from '../Member/Member'
import HighlightedLink from '../HighlightedLink/HighlightedLink'

const members = [
  {
    name: 'Michael Ngo',
    role: 'Full-Stack Developer',
    major: 'iSchool • Informatics',
    about: 'NBA Fan',
    picture: michaelPhoto,
  },
  {
    name: 'Christine Smet',
    role: 'UX Designer',
    major: 'iSchool • Informatics',
    about: 'Boba Connoisseur',
    picture: christinePhoto,
  },
  {
    name: 'Krystal Liang',
    role: 'PM and UX Researcher',
    major: 'iSchool • Informatics',
    about: (
      <HighlightedLink
        site="https://www.instagram.com/eatwithher/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @eatwithher
      </HighlightedLink>
    ),
    picture: krystalPhoto,
  },
  {
    name: 'Daniel Colina',
    role: 'Full-Stack Developer',
    major: 'iSchool • Informatics',
    about: 'World Traveler',
    picture: danielPhoto,
  },
]

const Members = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleSponsorContainer}>
        <h1 className={styles.title}>PearCare Team</h1>
        <h2 className={styles.sponsor}>
          In collaboration with{' '}
          <HighlightedLink
            site="https://www.shipshapementalhealth.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ShipShape Mental Health
          </HighlightedLink>
        </h2>
      </div>
      <div className={styles.membersContainer}>
        {members.map(member => (
          <Member member={member} key={member.name} />
        ))}
      </div>
    </div>
  )
}

export default Members
