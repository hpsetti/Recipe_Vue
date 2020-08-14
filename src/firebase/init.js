import firebase from "firebase"
import firestore from "firebase/firestore"


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCdfELNSH09MPjttteRZAkRVfgGcGhZ0Hc",
    authDomain: "myrecipeapp-d0714.firebaseapp.com",
    databaseURL: "https://myrecipeapp-d0714.firebaseio.com",
    projectId: "myrecipeapp-d0714",
    storageBucket: "myrecipeapp-d0714.appspot.com",
    messagingSenderId: "1039715967460",
    appId: "1:1039715967460:web:955fee0bdd2882ad0227f1"
  };
  // Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()