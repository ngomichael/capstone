import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from '@reach/router'
import styles from './app.module.css'
import { SignUp } from './sign-up/sign-up'
import { SignIn } from './sign-in/sign-in'
import { Home } from './home/home'
import { Questionnaire } from './questionnaire/questionnaire'
import { MatchedProviders } from './matched-providers/matched-providers'
import { ProviderInfo } from './provider-info/provider-info'
import { Prompt } from './prompt/prompt'
import { UndrawAboutMe, UndrawHire, UndrawShopping } from 'react-undraw'
import firebase from './firebase/firebase'
import { Button, TYPES, SIZES } from './common/button' //get rid of this later
import { AuthContext } from './auth-context'

class App extends Component {
  constructor(props) {
    super(props)
    this.getRankingScore = this.getRankingScore.bind(this)
    this.calculateResults = this.calculateResults.bind(this)
    this.getDuration = this.getDuration.bind(this)
    this.state = {
      all_providers:[],
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

  //given an user and a provider, look through their questionnaire responses, and provide a ranking
  // reflecting % match. Returns a provider object with a ranking score field.
   getRankingScore(user, provider) { 
    let totalRank = 0;
    // await this.getDuration(user.zip_code, [provider.address], provider)
    // console.log('Here we go again', this.state.all_providers[0]);

    //check approaches
    user.terms.forEach((user_term) => {
       provider.terms.forEach((provider_term => {
                  if(user_term === provider_term) {
                    console.log("we went in the totalRank");
                    totalRank = totalRank + 1;
                  }
       }))
    }) 

    return totalRank;
    // console.log('passed in', user, provider);
    // console.log('the provider address is', provider_address);
    // console.log('the user zip is', user.zip_code );
  }

  // Given the location of the user zipcode as a string called user_zip, and an array of the
  //providers zip codes called providers_zip, return a list of provider objects,
  /// ordered from shortest to longest distance
 async getDuration(user_zip, providers_address, provider_object) {
    let prefix = ' Seattle, WA '
    let origin = prefix + user_zip
    let destinations_list = providers_address.map(address => {
      return address + prefix
    }, this)
    // console.log('this is the provider address', destinations_list)
    // console.log('this is the origin ', [origin])
    let service = new google.maps.DistanceMatrixService()

   service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations_list,
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false,
      },
      await ((response, status) => {callback(response, status)})
    )

   let callback = (response, status) => {
      if (status == 'OK') {
        let origins = response.originAddresses
        let destinations = response.destinationAddresses
        for (let i = 0; i < origins.length; i++) {
          let results = response.rows[i].elements
          for (let j = 0; j < results.length; j++) {
            let element = results[j]
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
           this.state.all_providers.push(provider_object);
          }
        }
        // console.log('The final list is...');
        // console.log(this.state.all_providers);
      }
    }
  }

calculateResults() {
    try {
      // An attempt  to get user data from users_pearcare collection

      let user = firebase.getUserProfile()
      let user_id = user.uid + '';
      console.log('this is the user id', user_id);
      let user_data = '';

      // firebase.db.collection('users_pearcare').doc(user_id).get().then((doc) =>{
      //   if (doc.exists) {
      //    user_data = doc.data();
      //   } else {
      //     console.log('No such user!')
      //   }
      // }).catch((e) => {
      //   console.log(e);
      // });

      // Need to find out how to connect user's name to their answers later on...

      // Get user's questionnaire answers
      let questionnaire_id = user_id;
      let questionnaireRef = firebase.db
        .collection('users_test')
        .doc(questionnaire_id)
      let user_answers = ''
      questionnaireRef
        .get()
        .then(doc => {
          if (doc.exists) {
            user_answers = doc.data()
          } else {
            console.log('No such questionnaire!')
          }
        })
        .catch(error => {
          console.log('Error getting document:', error)
        })

      // Look through providers to get ranked list
    
      firebase.db
        .collection('providers_test2')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(provider => {
            let provider_answers = provider.data()
            // console.log('Providers answers are', provider_answers)
            // console.log('The user answers are', user_answers)
            provider_answers.provider_score = this.getRankingScore(user_answers, provider_answers);

            // Get the distance for each provider and make a new provider object that holds that information 
            // this.setState((prevState => {
            //   provider_list: [...this.state.provider_list, provider_answers]
            // })

            // console.log(this.state.all_providers)
            // console.log(provider_answers)

            this.setState((prevState) => ({
              all_providers: [...prevState.all_providers, provider_answers]
            }))
   
            //  full_provider.distance = results[0].distance;
            //  full_provider.distance_text = results[0].distance_text;
            
            
            // console.log('the distance function returned ', results);
            // console.log('the result is ', distance_results[0])
            // console.log('heres the string index', distance_results['""0""'])
            // console.log('heres the string index', distance_results['"0"'])
            // console.log('the full provider is ', full_provider);
           
          }, this)
        
        })
        .then(() => {
          this.state.all_providers.sort((a, b ) => {
            return b.provider_score - a.provider_score;
          })
          console.log('this is the sorted list', this.state.all_providers);
         
          let highestScore = this.state.all_providers[0].provider_score;
          
          this.state.all_providers.forEach((provider) => {
          })

        })
    
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return this.state.firebaseInitialized ? (
      <div>
        <Router>
          <Home path="/" />
          <Questionnaire path="questionnaire" />
          <MatchedProviders provider_list= {this.state.all_providers} path="results" />
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

        <Button
          type="button"
          buttonType={TYPES.PRIMARY}
          buttonSize={SIZES.MEDIUM}
          onClick={this.calculateResults}
        >
          See all results (TEST)
        </Button>
      </div>
    ) : (
      <div className={styles.loadContainer}>
        <div className={styles.loader} />
      </div>
    )
  }
}

export default hot(module)(App)
