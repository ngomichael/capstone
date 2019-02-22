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
  addFirstName(firstName) {
    if (!this.auth.currentUser) {
      return alert('Not Authorize')
    }
    return this.db.doc(`users_pearcare/${this.auth.currentUser.uid}`).set({
      firstName
    })
  }

  addLastName(lastName) {
    if (!this.auth.currentUser) {
      return alert('Not Authorize')
    }
    return this.db.doc(`users_pearcare/${this.auth.currentUser.uid}`).set({
      lastName
    })
  }

  addEmail(email) {
    if (!this.auth.currentUser) {
      return alert('Not Authorize')
    }
    return this.db.doc(`users_pearcare/${this.auth.currentUser.uid}`).set({
      email
    })
  }

  addZipCode(zipCode) {
    if (!this.auth.currentUser) {
      return alert('Not Authorize')
    }
    return this.db.doc(`users_pearcare/${this.auth.currentUser.uid}`).set({
      zipCode
    })
  }

  addPassword(password) {
    if (!this.auth.currentUser) {
      return alert('Not Authorize')
    }
    return this.db.doc(`users_pearcare/${this.auth.currentUser.uid}`).set({
      password
    })
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
