import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: 'AIzaSyCSXzJxaTt_cg69RKUk-MW5XflT0VMAsPI',
  authDomain: 'pear-care.firebaseapp.com',
  databaseURL: 'https://pear-care.firebaseio.com',
  projectId: 'pear-care',
  storageBucket: 'pear-care.appspot.com',
  messagingSenderId: '116618813442',
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.db = app.firestore()
    this.auth = app.auth()
  }

  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
    }
  }

  addUserQuestionnaireAnswers(answers) {
    if (!this.auth.currentUser) {
      this.db.collection('questionnaire_answers').add({
        zip_code: answers.zip_code,
        care_types: answers.care_types,
        issues: answers.issues,
        insurances: answers.insurances,
        age_groups: answers.age_groups,
        credentials: answers.credentials,
        approaches: answers.approaches,
        populations: answers.populations,
        user_type: 'client',
      })
    }

    return this.db
      .collection('questionnaire_answers')
      .doc(this.auth.currentUser.uid)
      .set(
        {
          zip_code: answers.zip_code,
          care_types: answers.care_types,
          issues: answers.issues,
          insurances: answers.insurances,
          age_groups: answers.age_groups,
          credentials: answers.credentials,
          approaches: answers.approaches,
          populations: answers.populations,
          user_type: 'client',
        },
        { merge: true }
      )
  }

  addProviderQuestionnaireAnswers(answers) {
    const terms = [
      ...answers.zip_code,
      ...answers.care_types,
      ...answers.issues,
      ...answers.insurances,
      ...answers.age_groups,
      ...answers.credentials,
      ...answers.approaches,
      ...answers.populations,
    ]

    const termsObject = terms.reduce((object, term) => {
      let formattedTerm = term
        .split(' ')
        .join('_')
        .toLowerCase()

      if (formattedTerm.includes('/')) {
        formattedTerm = formattedTerm.split('/').join('_')
      }

      object[formattedTerm] = true
      return object
    }, {})

    if (!this.auth.currentUser) {
      return this.db.collection('providers_test').add({
        terms,
        termsObject,
        zip_code: answers.zip_code,
        email: answers.email,
        phone_number: answers.phone_number,
        website: answers.website,
        name: answers.name,
        contact: answers.contact,
        reminders: answers.reminders,
        insurances: answers.insurances,
        care_types: answers.care_types,
        age_groups: answers.age_groups,
        populations: answers.populations,
        issues: answers.issues,
        questionnaire_answers: [
          {
            label: 'Type of Care',
            values: answers.care_types,
          },
          {
            label: 'Client Focus',
            values: answers.age_groups,
          },
          {
            label: 'Experienced with',
            values: answers.issues,
          },
          {
            label: 'Credentials',
            values: answers.credentials,
          },
          {
            label: 'Approach to treatment',
            values: answers.approaches,
          },
        ],
      })
    }

    return this.db
      .collection('providers_test')
      .doc(this.auth.currentUser.uid)
      .set(
        {
          terms,
          termsObject,
          zip_code: answers.zip_code,
          email: answers.email,
          phone_number: answers.phone_number,
          website: answers.website,
          name: answers.name,
          contact: answers.contact,
          reminders: answers.reminders,
          insurances: answers.insurances,
          care_types: answers.care_types,
          age_groups: answers.age_groups,
          populations: answers.populations,
          issues: answers.issues,
          questionnaire_answers: [
            {
              label: 'Type of Care',
              values: answers.care_types,
            },
            {
              label: 'Client Focus',
              values: answers.age_groups,
            },
            {
              label: 'Experienced with',
              values: answers.issues,
            },
            {
              label: 'Credentials',
              values: answers.credentials,
            },
            {
              label: 'Approach to treatment',
              values: answers.approaches,
            },
          ],
        }
        // { merge: true }
      )
  }

  addUserInformation(firstName, lastName, password, email) {
    if (!this.auth.currentUser) {
      return alert('Not Authorized')
    }

    return this.db
      .collection('users_pearcare')
      .doc(this.auth.currentUser.uid)
      .set({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })

      .catch(err => console.log(err))
  }

  getAllProviders() {
    return this.db.collection('providers').get()
  }

  filterProviderName(name) {
    const providersRef = this.db.collection('providers')
    const query = providersRef.where('name', '==', name).get()
    return query
  }

  filterProviders(terms) {
    const providersRef = this.db.collection('providers_test')
    let ref = providersRef

    const formattedTerms = terms.map(term => {
      if (term.includes('/')) {
        term = term.split('/').join('_')
      }

      return term
        .split(' ')
        .join('_')
        .toLowerCase()
    })

    formattedTerms.forEach(val => {
      ref = ref.where(`termsObject.${val}`, '==', true)
    })
    const query = ref.get()
    return query
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getSignedInUser() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        return user
      } else {
        console.log('No user is signed in')
        console.log(this.auth.currentUser)
      }
    })
  }

  getUserProfile() {
    return this.auth.currentUser
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  getCurrentEmail() {
    return this.auth.currentUser && this.auth.currentUser.email
  }
}

export default new Firebase()
