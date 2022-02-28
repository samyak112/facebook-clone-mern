import firebase from 'firebase'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_API_authDomain,
  projectId: process.env.REACT_APP_API_projectId,
  storageBucket: process.env.REACT_APP_API_storageBucket,
  messagingSenderId: process.env.REACT_APP_API_messagingSenderId,
  appId: process.env.REACT_APP_API_appId
}

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage