import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router, navigate } from '@reach/router'
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
    this.getRankingScore = this.getRankingScore.bind(this)
    this.calculateResults = this.calculateResults.bind(this)
    this.getDuration = this.getDuration.bind(this)
    this.state = {
      signedInUser: {},
      userInfo: {
        savedProviders: [],
      },
      userId: '',
      isLoading: true,
      all_providers: [],
      highest_score: 0,
      user_terms: 0,
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
        this.setState({
          signedInUser: user,
          userId: user.uid,
          userInfo: userInfo.docs.map(doc => doc.data())[0],

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

  //given an user and a provider, look through their questionnaire responses, and provide a ranking
  // reflecting % match. Returns a provider object with a ranking score field.
  getRankingScore(user, provider) {
    let totalRank = 0
    let insuranceTerms = new Set([
      'Beacon Health Options',
      'Blue Cross Blue Shield',
      'Harvard Pilgrim Health',
      'Aetna',
      'Medicare',
      'Tufts',
      'UnitedHealthcare',
      'University student insurance/ Affiliate extended insurance',
    ])
    let takesInsurance = false

    //check approaches
    user.terms.forEach(user_term => {
      provider.terms.forEach(provider_term => {
        if (
          user_term === provider_term &&
          user_term != "My insurance isn't listed"
        ) {
          if (insuranceTerms.has(user_term)) {
            //is an insurance
            takesInsurance = true
          } else {
            totalRank = totalRank + 1
          }
        }
      })
    })

    if (takesInsurance) {
      totalRank + 1
    }
    // console.log('get ranking score returns THIS', totalRank);
    return totalRank
  }

  // Given the location of the user zipcode as a string called user_zip, and an array of the
  //providers zip codes called providers_zip, return a list of provider objects,
  /// ordered from shortest to longest distance
  async getDuration(user_zip, provider_address, provider_object) {
    let prefix = ' Seattle, WA '
    let origin = prefix + user_zip
    let destination = provider_address
    console.log('this is the destination', [destination])
    console.log('this is the origin ', [origin])
    let service = new google.maps.DistanceMatrixService()

    await service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false,
      },
      await ((response, status) => {
        callback(response, status)
      })
    )

    let callback = (response, status) => {
      if (status == 'OK') {
        let origins = response.originAddresses
        let destinations = response.destinationAddresses
        for (let i = 0; i < origins.length; i++) {
          let results = response.rows[i].elements
          for (let j = 0; j < results.length; j++) {
            let element = results[j] || {}
            let distance_text = element.distance.text
            let distance_value = element.distance.value
            let destination_result = destinations[j]
            let duration_text = element.duration.text
            let duration_value = element.duration.value

            provider_object.distance_results = {
              provider_location: destination_result,
              client_origin: origins[i],
              distance: distance_value,
              distance_text: distance_text,
              travel_time: duration_value,
              travel_text: duration_text,
            }

            console.log('adding this provider', provider_object)
            this.setState(prevState => ({
              all_providers: [...prevState.all_providers, provider_object],
            }))
          }
        }
      }
    }
  }

  // What does the given context have?
  // How do I give the final made by this function to the context so that the matchedproviders component can use it?
  calculateResults(context) {
    try {
      // Look through providers to get ranked list
      //Start empty
      this.setState({
        all_providers: [
          {
            provider_score: 0,
            questionnaire_answers: [],
            distance_results: { distance_text: '', duration_text: '' },
          },
        ],
        user_terms: context.terms.length,
      })

      firebase.db
        .collection('providers_test2')
        .get()
        .then(querySnapshot => {
          //Fill up state with each provider
          querySnapshot.forEach(async provider => {
            let provider_answers = provider.data()

            //add provider score to each provider
            provider_answers.provider_score = this.getRankingScore(
              context,
              provider_answers
            )
            await this.getDuration(
              context.zip_code,
              provider_answers.address,
              provider_answers
            )
          }, this)
        })
        .then(() => {
          this.setState({
            all_providers: this.state.all_providers.sort((a, b) => {
              return b.provider_score - a.provider_score
            }),
          })

          this.setState({
            highest_score: this.state.all_providers[0].provider_score,
          })
        })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <UserProvider value={this.state}>
        <Router className={styles.onboardingContainer}>
          <OnboardingHeader path={ONBOARDING_ROUTES.onboardingHeader} />
          <DashboardHeader path={ROUTES.dashboardHeader} />
        </Router>

        <Router>
          <Home path={ROUTES.home} />
          <Questionnaire
            path={ONBOARDING_ROUTES.questionnaire}
            function={this.calculateResults}
          />
          <ProviderQuestionnaire
            path={ONBOARDING_ROUTES.providerQuestionnaire}
          />
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
            // savedProviderIds={this.state.userInfo.savedProviders}
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
