import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router, navigate } from '@reach/router'
import { ROUTES, ONBOARDING_ROUTES } from './constants/routes'
import styles from './app.module.css'
import { SignUp } from './sign-up/sign-up'
import { ProviderSignUp } from './sign-up/provider-sign-up'
import { SignIn } from './sign-in/sign-in'
import { Home } from './home/home'
import { Questionnaire } from './questionnaire/questionnaire'
import { ProviderQuestionnaire } from './questionnaire/provider-questionnaire'
import { MatchedProviders } from './matched-providers/matched-providers'
import { ProviderInfo } from './provider-info/provider-info'
import { Prompt } from './prompt/prompt'
import { Dashboard } from './dashboard/dashboard'
import { Tracker } from './dashboard/tracker'
import { OnboardingHeader } from './common/onboarding-header'
import { DashboardHeader } from './dashboard/dashboard-header'
import { UndrawHire, UndrawProfile } from 'react-undraw'
import firebase from './firebase/firebase'
import { UserProvider } from './context/user-context'
import { PrivateRoute } from './private-route/private-route'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signedInUser: {},
      userInfo: {
        savedProviders: [],
      },
      userId: '',
      isLoading: true,
      all_providers: [],
      highest_score: 0,
    }
  }

  async componentDidMount() {
    await firebase.isInitialized().then(async val => {
      if (val) {
        // this.setState({
        //   getSignedInUserInvoked: true,
        // })
      }
    })

    // listens for signing in and up or logging out
    firebase.auth.onAuthStateChanged(async user => {
      if (user) {
        const userInfo = await firebase.getSignedInUserInfo(user.uid)
        console.log('WAIT WTF')
        console.log(userInfo.docs.map(doc => doc.data())[0])

        this.setState({
          signedInUser: user,
          userId: user.uid,
          // userInfo: userInfo.docs.map(doc => doc.data())[0],
          userInfo: {
            savedProviders: [],
          },
          previousLocation: window.previousLocation,
        })

        this.setState({
          isLoading: false,
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
          signedInUser: {},
          userInfo: {
            savedProviders: [],
          },
          userId: '',
          isLoading: false,
          previousLocation: window.previousLocation,
        })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <UserProvider value={this.state}>
        <Router className={styles.onboardingContainer}>
          <OnboardingHeader path={ONBOARDING_ROUTES.onboardingHeader} />
          <DashboardHeader path={ROUTES.dashboardHeader} />
        </Router>

        <Router>
          <Home path={ROUTES.home} />
          <Questionnaire path={ONBOARDING_ROUTES.questionnaire} />
          <MatchedProviders path={ONBOARDING_ROUTES.results} />
          <ProviderInfo
            path={ONBOARDING_ROUTES.providerInfo}
            prevPath={ONBOARDING_ROUTES.results}
          />
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
            skipTextPath={`${ONBOARDING_ROUTES.results}`}
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
            nextPath={`${ONBOARDING_ROUTES.results}`}
            prevPath={`/${ONBOARDING_ROUTES.questionnaire}`}
            step={2}
            skipText="Want to change your answers?"
            skipText2="Go back to the questionnaire."
            skipTextPath={`${ONBOARDING_ROUTES.questionnaire}`}
          />

          <SignUp path={ROUTES.signUp} />
          <SignIn path={ROUTES.signIn} />

          <ProviderQuestionnaire
            path={ONBOARDING_ROUTES.providerQuestionnaire}
          />

          <ProviderSignUp path={ROUTES.providerSignUp} />

          <PrivateRoute
            path={ROUTES.providerInfoTracker}
            prevPath={ROUTES.tracker}
            component={ProviderInfo}
          />
          <PrivateRoute
            path={ROUTES.providerInfo}
            prevPath={ROUTES.dashboard}
            component={ProviderInfo}
          />
          <PrivateRoute path={ROUTES.results} component={MatchedProviders} />
          <PrivateRoute path={ROUTES.dashboard} component={Dashboard} />
          <PrivateRoute
            path={ROUTES.tracker}
            savedProviderIds={this.state.userInfo.savedProviders}
            component={Tracker}
          />
          {/* <Tracker
            path={ROUTES.tracker}
            savedProviderIds={this.state.userInfo.savedProviders}
          /> */}
        </Router>
      </UserProvider>
    )
  }
}

export default hot(module)(App)
