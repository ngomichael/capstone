import React, { useState } from 'react'
import styles from './Video.module.css'
import ProviderVideo from '../videos/ProviderVideo.mp4'

const Video = props => {
  return (
    <video className={styles.container} controls>
      <source src={ProviderVideo} type="video/mp4" />
    </video>
  )
}

export default Video
