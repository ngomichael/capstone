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
    this.app = app.auth()
    this.db = app.firestore()
    this.auth = app.auth()
  }

  signIn(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut() {
    this.auth.signOut()
  }

  async register(name, email, password) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
    }
  }

  addInformation(firstName, lastName, password, email, zipcode) {
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

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  getCurrentEmail() {
    return this.auth.currentUser && this.auth.currentUser.email
  }
}

export default new Firebase()
