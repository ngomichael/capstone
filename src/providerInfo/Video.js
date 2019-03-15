import React, { useState } from 'react'
import styles from './Video.module.css'
import ProviderVideo from '../videos/ProviderVideo.mp4'
import JenAdams from '../videos/JenAdamsVideo.mp4'

const Video = props => {
  return (
    <video className={styles.container} controls>
      <source src={JenAdams} type="video/mp4" />
    </video>
  )
}

export default Video
