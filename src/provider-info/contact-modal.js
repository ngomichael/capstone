import React from 'react'
import PropTypes from 'prop-types'
import styles from './contact-modal.module.css'
import { Button, TYPES, SIZES } from '../common/button'
import { X } from 'react-feather'

export const ContactModal = ({ handleClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <X className={styles.closeButton} onClick={handleClose} />
        <div className={styles.actionItems}>
          <p className={styles.header}>
            Here's how you get in touch with Stacy
          </p>
          <p className={styles.subheader}>What you'll need to do</p>
          <p>Send Stacy an email or fill out the intake form on his website</p>
          <p className={styles.subheader}>What to expect from Stacy</p>
          <p>
            Stacy hopes to respond to all potential new clients within 3-5
            business days. If he agrees you'd be a good fit, he'll ask for your
            availability to set up an in- person consultation. If not, he'll let
            you know why and attempt to refer you to providers he knows that may
            be a better fit.
          </p>
        </div>
        <div className={styles.contactButtons}>
          <a
            href="https://www.shipshapementalhealth.com/"
            rel="noreferrer noopener"
            target="_blank"
            className={styles.websiteLink}
          >
            <Button
              type="button"
              buttonType={TYPES.PRIMARY}
              buttonSize={SIZES.MEDIUM}
            >
              Website
            </Button>
          </a>
          <Button
            type="button"
            buttonType={TYPES.PRIMARY}
            buttonSize={SIZES.MEDIUM}
          >
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
