import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import styles from './app.module.css'
import { SignUp } from './sign-up/sign-up'
import { SignIn } from './sign-in/sign-in'
import { Home } from './home/home'
import { Questionnaire } from './questionnaire/questionnaire'
import { ProviderQuestionnaire } from './questionnaire/provider-questionnaire'
import { MatchedProviders } from './matched-providers/matched-providers'
import { ProviderInfo } from './provider-info/provider-info'
import { Prompt } from './prompt/prompt'
import { UndrawAboutMe, UndrawHire } from 'react-undraw'
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
        <ProviderInfo path="providerInfo" />
        <Prompt
          path="getStarted"
          image={
            <UndrawAboutMe
              primaryColor="hsl(174, 74%, 39%)"
              className={styles.image}
              style={{ width: '350px' }}
            />
          }
          title="Welcome to PearCare"
          p1="We're just going to ask you a few questions about what you're looking for. This will help us match you with the providers best suited for you."
          p2="Don't worry, answering these questions will only take a few minutes"
          buttonText="Start Questionnaire"
          nextPath="/questionnaire"
          prevPath="/"
          step={1}
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
        />

        <SignUp path="signup" />
        <SignIn path="signin" />
      </Router>
    )
  }
}

export default hot(module)(App)
