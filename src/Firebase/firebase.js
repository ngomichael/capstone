import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { config } from './config'

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  addInformation(firstName, lastName, password, email, zipcode) {
    if (!this.auth.currentUser) {
      return alert('Not Authorized')
    }
    return this.db.collection('users_pearcare').add({
      first_name: firstName,
      last_name: lastName, 
      email_address:email, 
      pass_word: password, 
      zip_code: zipcode

    }).catch(err => console.log(err))
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }
}

export default new Firebase()
