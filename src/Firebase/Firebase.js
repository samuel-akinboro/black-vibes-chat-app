 import firebase from 'firebase'

const firebaseConfig = {
     apiKey: "AIzaSyCqH_lFpMyhQoVgh6K3RPgNwpY2iJz09l8",
     authDomain: "black-vibes-messenger.firebaseapp.com",
     projectId: "black-vibes-messenger",
     storageBucket: "black-vibes-messenger.appspot.com",
     messagingSenderId: "43554177573",
     appId: "1:43554177573:web:9d670600d9e035c72db5cc"
};
 
 // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
 
// database
const database = firebaseApp.firestore();

// auth
const auth = firebase.auth();

// provider
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider, database}