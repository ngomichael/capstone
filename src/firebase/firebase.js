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

  addUserQuestionnaire(uid, care_types) {
    if (!this.auth.currentUser) {
      return alert('Not Authorized')
    }

    console.log(this.db.collection('users_pearcare').doc(uid))

    return this.db
      .collection('users_pearcare')
      .doc(uid)
      .set(
        {
          // zip_code: zip_code,
          care_types: care_types,
          // issues: issues,
          // insurances: insurances,
          // age_groups: age_groups,
          // credentials: credentials,
          // approaches: approaches,
          // populations: populations,
        },
        { merge: true }
      )
  }

  addUserInformation(firstName, lastName, password, email, zipcode) {
    if (!this.auth.currentUser) {
      return alert('Not Authorized')
    }

    return this.db
      .collection('users_pearcare')
      .add({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        zip_code: zipcode,
      })
      .then(docRef => {
        this.auth.currentUser.updateProfile({
          id: docRef.id,
          displayName: firstName,
          password: password,
          email: email,
        })
      })
      .catch(err => console.log(err))
  }

  // returning null
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getSignedInUser() {
    this.auth.onAuthStateChanged(user => {
      // console.log(this.auth.currentUser)
      if (user) {
        // console.log(user.uid)
        return user
      } else {
        console.log('No user is signed in')
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
