import React from 'react'
import styles from './HomePage.module.css'
import { Element } from 'react-scroll'
import Hero from './Hero/Hero'
import ValueProps from './ValueProps/ValueProps'
import Features from './Features/Features'
import Members from './Members/Members'
import Contact from './Contact/Contact'
import Separater from './Separater/Separater'
import Layout from './layout'

const HomePage = () => (
  <Layout>
    <div className={styles.container}>
      <Element className={styles.hero}>
        <Hero />
      </Element>
      <Separater />
      <Element className={styles.valueProps} name="ValueProps">
        <ValueProps />
      </Element>
      <Separater />
      <Element className={styles.features} name="Features">
        <Features />
      </Element>
      <Separater />
      <Element className={styles.valueProps} name="Team">
        <Members />
      </Element>
      <Separater />
      <div>
        <Contact />
      </div>
    </div>
    </Layout>
)

export default HomePage
