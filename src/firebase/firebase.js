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
      ...answers.care_types,
      ...answers.issues,
      ...answers.insurances,
      ...answers.age_groups,
      ...answers.credentials,
      ...answers.approaches,
      ...answers.populations,
    ]

    const termsObject = terms.reduce((object, term) => {
      const formattedTerm = term
        .split(' ')
        .join('_')
        .toLowerCase()

      object[formattedTerm] = true
      return object
    }, {})

    if (!this.auth.currentUser) {
      this.db.collection('provider_answers').add({
        terms,
        termsObject,
        user_type: 'provider',
      })
    }

    return this.db
      .collection('provider_answers')
      .doc(this.auth.currentUser.uid)
      .set(
        {
          terms,
          termsObject,
          user_type: 'provider',
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

  // filterProviders(filter, value) {
  //   // in client send object of filters
  //   const providersRef = this.db.collection('providers')
  //   const query = providersRef
  //     .where(filter, 'array-contains', value)
  //     // .where('care_types', 'array-contains', 'Couples counselor')
  //     .get()
  //   return query
  // }

  filterProviders(terms) {
    // in client send object of filters
    const providersRef = this.db.collection('providers')
    let ref = providersRef

    const formattedTerms = terms.map(term =>
      term
        .split(' ')
        .join('_')
        .toLowerCase()
    )

    formattedTerms.forEach(val => {
      ref.where(`termsObject.${val}`, '==', true)
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
