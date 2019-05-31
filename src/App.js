import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import { ROUTES, ONBOARDING_ROUTES } from './constants/routes'
import styles from './app.module.css'
import { SignUp } from './sign-up/sign-up'
import { SignIn } from './sign-in/sign-in'
import { Home } from './home/home'
import { Questionnaire } from './questionnaire/questionnaire'
import { ProviderQuestionnaire } from './questionnaire/provider-questionnaire'
import { MatchedProviders } from './matched-providers/matched-providers'
import { ProviderInfo } from './provider-info/provider-info'
import { Prompt } from './prompt/prompt'
import { OnboardingHeader } from './common/onboarding-header'
import { UndrawHire, UndrawProfile } from 'react-undraw'
import firebase from './firebase/firebase'
import { UserProvider } from './context/user-context'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firebaseInitialized: false,
      signedInUser: {},
      userInfo: {},
      userId: '',
    }
  }

  async componentDidMount() {
    await firebase.isInitialized().then(async val => {
      if (val) {
        this.setState({
          firebaseInitialized: true,
        })
      }
    })

    // listens for signing in and up or logging out
    firebase.auth.onAuthStateChanged(async user => {
      if (user) {
        const userInfo = await firebase.getSignedInUserInfo(user.uid)
        this.setState({
          signedInUser: user,
          userId: user.uid,
          userInfo: userInfo.docs.map(doc => doc.data())[0],
        })

        // listens to the current user's document for any changes and updates
        firebase.db
          .collection('users_test')
          .doc(user.uid)
          .onSnapshot(doc => {
            this.setState({
              userInfo: doc.data(),
            })
          })
      } else {
        console.log('No user is signed in')

        this.setState({
          signedInUser: null,
          userId: null,
          userInfo: null,
        })
      }
    })
  }

  render() {
    return (
      <UserProvider value={this.state}>
        <Router className={styles.onboardingContainer}>
          <OnboardingHeader path={ONBOARDING_ROUTES.onboardingHeader} />
        </Router>
        <Router>
          <Home path={ROUTES.home} />
          <Questionnaire path={ONBOARDING_ROUTES.questionnaire} />
          <ProviderQuestionnaire
            path={ONBOARDING_ROUTES.providerQuestionnaire}
          />
          <MatchedProviders path={ONBOARDING_ROUTES.results} />
          <ProviderInfo path={ONBOARDING_ROUTES.providerInfo} />

          <Prompt
            path={ONBOARDING_ROUTES.getStarted}
            image={
              <UndrawProfile
                primaryColor="hsl(174, 74%, 39%)"
                className={styles.image}
                style={{ width: '350px' }}
              />
            }
            title="Tell us what matters to you"
            p1="We're just going to ask you a few questions about what you're looking for. This will help us match you with the providers best suited for you."
            p2="Don't worry, answering these questions will only take a few minutes"
            buttonText="Start Questionnaire"
            nextPath={`/${ONBOARDING_ROUTES.questionnaire}`}
            prevPath={ROUTES.home}
            step={1}
            skipText="Don't have time right now?"
            skipText2="Skip to a list of providers."
            skipTextPath={`/${ONBOARDING_ROUTES.results}`}
          />

          <Prompt
            path={ONBOARDING_ROUTES.questionnaireCompleted}
            image={
              <UndrawHire
                primaryColor="hsl(174, 74%, 39%)"
                className={styles.image}
                style={{ width: '350px' }}
              />
            }
            title="Way to go! We pear-reviewed providers just for you."
            p1="We used your answers on the last page to find providers who may be a good fit for you."
            p2="You can also continue adjusting what you're looking for by adding or removing filters, using the search bar, or editing your answers to the questionnaire."
            buttonText="View Results"
            nextPath={`/${ONBOARDING_ROUTES.results}`}
            prevPath={`/${ONBOARDING_ROUTES.questionnaire}`}
            step={2}
            skipText="Want to change your answers?"
            skipText2="Go back to the questionnaire."
            skipTextPath={`/${ONBOARDING_ROUTES.questionnaire}`}
          />

          <SignUp path={ROUTES.signUp} />
          <SignIn path={ROUTES.signIn} />
        </Router>
      </UserProvider>
    )
  }
}

export default hot(module)(App)
