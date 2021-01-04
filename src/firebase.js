import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCRikWNRskGXxWcvmk-Lj9mDV96TOLrSHg",
  authDomain: "workflow-a.firebaseapp.com",
  projectId: "workflow-a",
   storageBucket: "workflow-a.appspot.com",
   messagingSenderId: "612098345904",
   appId: "1:612098345904:web:a7df21a1193600d1eee475",
   measurementId: "G-HVBJCNKTDC"
 };

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const docsCollection = db.collection('docs')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  docsCollection,
}

