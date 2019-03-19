import React from 'react'
import styles from './contact-modal.module.css'
import { Button, TYPES, SIZES } from '../common/button'

const ContactModal = ({ handleClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#149184"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.closeButton}
          onClick={handleClose}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
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
              Webiste
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

export default ContactModal
