import React, { useState } from 'react'
import styles from './video.module.css'
import ProviderVideo from '../videos/ProviderVideo.mp4'
import JenAdams from '../videos/JenAdamsVideo.mp4'

export const Video = () => {
  return (
    <video className={styles.container} controls>
      <source src={JenAdams} type="video/mp4" />
    </video>
  )
}
