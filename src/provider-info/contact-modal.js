import React from 'react'
import PropTypes from 'prop-types'
import styles from './contact-modal.module.css'
import { Button, TYPES, SIZES } from '../common/button'
import { X } from 'react-feather'

export const ContactModal = ({
  handleClose,
  name,
  email,
  website,
  setIsModalOpen,
  isModalOpen,
}) => {
  console.log(isModalOpen)
  return (
    <div className={isModalOpen ? styles.container : styles.containerHidden}>
      <div
        className={
          isModalOpen ? styles.fadedBackground : styles.backgroundHidden
        }
        onClick={() => setIsModalOpen(false)}
      />
      <div className={isModalOpen ? styles.modal : styles.modalHidden}>
        <X className={styles.closeButton} onClick={handleClose} />
        <div className={styles.actionItems}>
          <p className={styles.header}>
            {`Here's how you get in touch with ${name}`}
          </p>
          <p className={styles.subheader}>What you'll need to do</p>
          <p>Send an email or fill out the intake form on their website</p>
          <p className={styles.subheader}>What to expect</p>
          <p>
            {`${name} hopes to respond to all potential new clients within 3-5
            business days. If they agree you'd be a good fit, they'll ask for
            your availability to set up an in-person consultation. If not,
            they'll let you know why and attempt to refer you to providers they
            know that may be a better fit.`}
          </p>
        </div>
        <div className={styles.contactButtons}>
          <a
            href={website}
            rel="noreferrer noopener"
            target="_blank"
            className={styles.websiteLink}
          >
            <Button
              type="button"
              buttonType={TYPES.PRIMARY}
              buttonSize={SIZES.S}
            >
              Website
            </Button>
          </a>
          <Button type="button" buttonType={TYPES.PRIMARY} buttonSize={SIZES.S}>
            Email
          </Button>
        </div>
      </div>
    </div>
  )
}

ContactModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
}
