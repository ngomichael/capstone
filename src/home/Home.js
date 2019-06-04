import React from 'react'
import styles from './home.module.css'
import { Link, Redirect } from '@reach/router'
import { HomeHeader } from '../common/home-header'
import { Button, TYPES, SIZES } from '../common/button'
import { ROUTES, ONBOARDING_ROUTES } from '../constants/routes'
import pears from '../images/pairOfPears.png'
import { UserConsumer } from '../context/user-context'

export const Home = () => {
  return (
    <UserConsumer>
      {context => (
        // context.isLoading === false && context.userId.length !== 0 ? (
        //   // (console.log(context.userInfo.questionnaire_finished),
        //   context.userInfo.questionnaire_finished ? (
        //     <Redirect to={ROUTES.dashboard} noThrow />
        //   ) : (
        //     <Redirect to={ONBOARDING_ROUTES.getStarted} noThrow />
        //   )
        // ) : (
        <div className={styles.container}>
          <HomeHeader />
          <div className={styles.maxWidthContainer}>
            <div className={styles.introContainer}>
              <h1 className={styles.tagline}>
                Better patient-provider pairs, better mental healthcare
              </h1>
              <p className={styles.supplementaryText}>
                Searching for mental health services and finding a provider that
                fits any given patient’s needs can be an overwhelming and
                time-consuming process. PearCare's matching algorithm intends to
                personalize every individual’s experience when searching for a
                provider.
              </p>
              <a
                href="https://krystl37.wixsite.com/pearcarelanding"
                rel="noopener noreferrer"
                target="_blank"
                className={styles.learnMoreLink}
              >
                <p>Learn more about how it works</p>
              </a>
              <Link to={ROUTES.signUp}>
                <Button
                  type="button"
                  buttonType={TYPES.PRIMARY}
                  buttonSize={SIZES.MEDIUM}
                >
                  Find a Provider
                </Button>
              </Link>
            </div>
            <div className={styles.pearImagesContainer}>
              <img src={pears} className={styles.pearImage} />
              <img src={pears} className={styles.pearImage} />
            </div>
          </div>
        </div>
      )
      // )
      // )
      }
    </UserConsumer>
    // <div className={styles.container}>
    //   <HomeHeader />
    //   <div className={styles.maxWidthContainer}>
    //     <div className={styles.introContainer}>
    //       <h1 className={styles.tagline}>
    //         Better patient-provider pairs, better mental healthcare
    //       </h1>
    //       <p className={styles.supplementaryText}>
    //         Searching for mental health services and finding a provider that
    //         fits any given patient’s needs can be an overwhelming and
    //         time-consuming process. PearCare's matching algorithm intends to
    //         personalize every individual’s experience when searching for a
    //         provider.
    //       </p>
    //       <a
    //         href="https://krystl37.wixsite.com/pearcarelanding"
    //         rel="noopener noreferrer"
    //         target="_blank"
    //         className={styles.learnMoreLink}
    //       >
    //         <p>Learn more about how it works</p>
    //       </a>
    //       <Link to={ONBOARDING_ROUTES.getStarted}>
    //         <Button
    //           type="button"
    //           buttonType={TYPES.PRIMARY}
    //           buttonSize={SIZES.MEDIUM}
    //         >
    //           Find a Provider
    //         </Button>
    //       </Link>
    //     </div>
    //     <div className={styles.pearImagesContainer}>
    //       <img src={pears} className={styles.pearImage} />
    //       <img src={pears} className={styles.pearImage} />
    //     </div>
    //   </div>
    // </div>
  )
}
