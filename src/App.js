import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router, Match } from '@reach/router'
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
import { UndrawAboutMe, UndrawHire, UndrawProfile } from 'react-undraw'
import firebase from './firebase/firebase'
import { AuthContext } from './auth-context'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firebaseInitialized: false,
    }
  }

  componentDidMount() {
    firebase.isInitialized().then(val => {
      this.setState({
        firebaseInitialized: val,
      })
    })

    firebase.getSignedInUser()
  }

  render() {
    return (
      <Router>
        <Home path="/" />
        <Questionnaire path="questionnaire" />
        <ProviderQuestionnaire path="providerQuestionnaire" />
        <MatchedProviders path="results" />
        <ProviderInfo path="results/:providerId" />
        {/* <Match path="(getStarted|questionnaire|questionnaireCompleted|results)"> */}
        {/* <Match path="results">
          {props => (props.match ? <OnboardingHeader step={1} /> : null)}
        </Match> */}
        {/* <Match path="results">
          {props => {
            console.log(props.match)
            return props.match ? <OnboardingHeader step={1} /> : null
          }}
        </Match> */}

        <Prompt
          path="getStarted"
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
          nextPath="/questionnaire"
          prevPath="/"
          step={1}
          skipText="Don't have time right now?"
          skipText2="Skip to a list of providers."
          skipTextPath="/results"
        />

        <Prompt
          path="questionnaireCompleted"
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
          nextPath="/results"
          prevPath="/questionnaire"
          step={2}
          skipText="Want to change your answers?"
          skipText2="Go back to the questionnaire."
          skipTextPath="/providerQuestionnaire"
        />

        <SignUp path="signup" />
        <SignIn path="signin" />
      </Router>
    )
  }
}

export default hot(module)(App)
