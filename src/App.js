import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import styles from './App.module.css'
import SignUp from './signUp/SignUp'
import SignIn from './signIn/SignIn'
import Home from './home/Home'
import Questionnaire from './questionnaire/Questionnaire'
import Results from './results/Results'
import ProviderInfo from './providerInfo/ProviderInfo'
import ConfirmationDetails from './confirmationDetails/ConfirmationDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <Questionnaire path="questionnaire" />
        <Results path="results" />
        <ProviderInfo path="providerInfo" />
        <ConfirmationDetails
          path="getStarted"
          title="Welcome to PearCare"
          p1="We're just going to ask you a few questions about what you're looking for. This will help us match you with the providers best suited for you."
          p2="Don't worry, answering these questions will only take a few minutes"
          buttonText="Start Questionnaire"
          to="/questionnaire"
        />
        <ConfirmationDetails
          path="questionnaireCompleted"
          title="Way to go! We pear-reviewed providers just for you."
          p1="We used your answers on the last page to find providers who may be a good fit for you."
          p2="You can also continue adjusting what you're looking for by adding or removing filters, using the search bar, or editing your answers to the questionnaire."
          buttonText="View Results"
          to="/results"
        />
        <SignUp path="signup" />
      </Router>
    )
  }
}

export default hot(module)(App)
