import firebase from 'firebase';
import Rebase from 're-base';


// Initialize Firebase
 const firebaseInfo = firebase.initializeApp({
    apiKey: "AIzaSyCF12OKvLudOsMdkeLDEHc7zpAF9u7i3hY",
    authDomain: "newpokertodo.firebaseapp.com",
    databaseURL: "https://newpokertodo.firebaseio.com",
    projectId: "newpokertodo",
    storageBucket: "newpokertodo.appspot.com",
    messagingSenderId: "427267363690"
  });

  const db = firebase.database(firebaseInfo);
  const config = Rebase.createClass(db);

  
  export const providers = {
    'google' : new firebase.auth.GoogleAuthProvider(),
  }


  export const auth = firebase.auth();
  export default config;