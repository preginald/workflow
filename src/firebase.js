import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const docsCollection = db.collection("docs");
const commandsCollection = db.collection("commands");

// export utils/refs
export { db, auth, usersCollection, docsCollection, commandsCollection };
