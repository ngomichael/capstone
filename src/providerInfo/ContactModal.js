import React from 'react'
import styles from './ContactModal.module.css'

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
            Here's how you get in touch with Morgan
          </p>
          <p className={styles.subheader}>What you'll need to do</p>
          <p>Send Morgan an email or fill out the intake form on his website</p>
          <p className={styles.subheader}>What to expect from Morgan</p>
          <p>
            Morgan hopes to respond to all potential new clients within 3-5
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
          >
            <button className={styles.contactButton}>Website</button>
          </a>
          <button className={styles.contactButton}>Email</button>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
