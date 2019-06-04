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
    this.user = {}
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

  addUserInformation(name, password, email) {
    if (!this.auth.currentUser) {
      return alert('Not Authorized')
    }

    return this.db
      .collection('users_test')
      .doc(this.auth.currentUser.uid)
      .set({
        name: name,
        email: email,
        password: password,
        questionnaire_finished: false,
        savedProviders: [],
        id: this.auth.currentUser.uid,
      })

      .catch(err => console.log(err))
  }

  addUserQuestionnaireAnswers(answers) {
    const terms = [
      ...[...answers.care_types.keys()],
      ...answers.issues,
      ...answers.insurances,
      ...[...answers.age_groups.keys()],
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
      this.db.collection('users_test').add({
        terms,
        termsObject,
        zip_code: answers.zip_code,
        care_types: [...answers.care_types.keys()],
        issues: answers.issues,
        insurances: answers.insurances,
        age_groups: [...answers.age_groups.keys()],
        credentials: answers.credentials,
        approaches: answers.approaches,
        populations: answers.populations,
        user_type: 'client',
      })
    }

    return this.db
      .collection('users_test')
      .doc(this.auth.currentUser.uid)
      .set(
        {
          terms,
          termsObject,
          zip_code: answers.zip_code,
          care_types: [...answers.care_types.keys()],
          issues: answers.issues,
          insurances: answers.insurances,
          age_groups: [...answers.age_groups.keys()],
          credentials: answers.credentials,
          approaches: answers.approaches,
          populations: answers.populations,
          user_type: 'client',
          questionnaire_finished: true,
        },
        { merge: true }
      )
  }

  addProviderQuestionnaireAnswers(answers) {
    const terms = [
      ...[...answers.care_types.keys()],
      ...answers.issues,
      ...answers.insurances,
      ...[...answers.age_groups.keys()],
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

    // if (!this.auth.currentUser) {
    const id = this.db.collection('providers_test3').doc().id
    console.log(id)
    console.log(answers)
    return this.db.collection('providers_test3').add({
      id: id,
      zip_code: answers.zip_code,
      address: answers.address,
      website: answers.website,
      photo: answers.photo,
      phone_number: answers.phone_number,
      credentials: answers.credentials,
      care_types: [...answers.care_types.keys()],
      age_groups: [...answers.age_groups.keys()],
      populations: answers.populations,
      approaches: answers.approaches,
      issues: answers.issues,
      email: answers.email,
      name: answers.name,
      insurances: answers.insurances,
      accepting_clients: [...answers.accepting_clients.keys()],
      payment_type: [...answers.payment_type.keys()],
      cost: answers.cost,
      biography: answers.biography,
      terms,
      termsObject,
      // contact: answers.contact,
      // reminders: answers.reminders,
      questionnaire_answers: [
        {
          label: 'Type of Care',
          values: [...answers.care_types.keys()],
        },
        {
          label: 'Client Focus',
          values: [...answers.age_groups.keys()],
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
        {
          label: 'Accepted insurances',
          values: answers.insurances,
        },
      ],
    })
    // }

    // return this.db
    //   .collection('providers_test2')
    //   .doc(this.auth.currentUser.uid)
    //   .set(
    //     {
    //       id: this.auth.currentUser.uid,
    //       terms,
    //       termsObject,
    //       address: answers.address,
    //       email: answers.email,
    //       phone_number: answers.phone_number,
    //       credentials: answers.credentials,
    //       website: answers.website,
    //       name: answers.name,
    //       contact: answers.contact,
    //       reminders: answers.reminders,
    //       insurances: answers.insurances,
    //       care_types: answers.care_types,
    //       age_groups: answers.age_groups,
    //       populations: answers.populations,
    //       approaches: answers.approaches,
    //       issues: answers.issues,
    //       questionnaire_answers: [
    //         {
    //           label: 'Type of Care',
    //           values: answers.care_types,
    //         },
    //         {
    //           label: 'Client Focus',
    //           values: answers.age_groups,
    //         },
    //         {
    //           label: 'Experienced with',
    //           values: answers.issues,
    //         },
    //         {
    //           label: 'Credentials',
    //           values: answers.credentials,
    //         },
    //         {
    //           label: 'Approach to treatment',
    //           values: answers.approaches,
    //         },
    //       ],
    //     }
    //     // { merge: true }
    //   )
  }

  getProviderInfo(providerId) {
    // console.log(providerId)
    const providersRef = this.db.collection('providers_test3')
    let ref = providersRef.where('id', '==', providerId)
    return ref.get()
  }

  async getAllSavedProviders(providerIds) {
    let providers = []
    providerIds.forEach(async id => {
      const snapshot = await this.getProviderInfo(id)
      const provider = snapshot.docs.map(doc => doc.data())[0]
      providers.push(provider)
    })
    console.log(providers)
  }

  getSignedInUserInfo(userId) {
    const usersRef = this.db.collection('users_test')
    let ref = usersRef.where('id', '==', userId)
    return ref.get()
  }

  favoriteProvider(providerId) {
    return this.db
      .collection('users_test')
      .doc(this.auth.currentUser.uid)
      .update({
        savedProviders: app.firestore.FieldValue.arrayUnion(providerId),
      })
  }

  unfavoriteProvider(providerId) {
    return this.db
      .collection('users_test')
      .doc(this.auth.currentUser.uid)
      .update({
        savedProviders: app.firestore.FieldValue.arrayRemove(providerId),
      })
  }

  // getAllSavedProviders(providerIds) {

  //   const providersRef = this.db.collection('providers_test2')
  //   let ref = providersRef

  //   formattedTerms.forEach(val => {
  //     ref = ref.where(`termsObject.${val}`, '==', true)
  //   })
  //   const query = ref.get()
  //   return query

  //   providerIds.forEach(providerId => {

  //   })
  // }

  getAllProviders() {
    return this.db.collection('providers_test3').get()
  }

  filterProviderName(name) {
    const providersRef = this.db.collection('providers')
    const query = providersRef.where('name', '==', name).get()
    return query
  }

  filterProviders(terms) {
    const providersRef = this.db.collection('providers_test3')
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
