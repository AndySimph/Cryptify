// Import the functions you need from the SDKs you need
//npm install firebase@5.0.1
//expo install expo-constants react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import  'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDJBFFG4XfWzPkZJLpf6B0GNxH8BGcMmE4",
  authDomain: "cryptify-44009.firebaseapp.com",
  databaseURL: "https://cryptify-44009-default-rtdb.firebaseio.com",
  projectId: "cryptify-44009",
  storageBucket: "cryptify-44009.appspot.com",
  messagingSenderId: "210679949147",
  appId: "1:210679949147:web:d2c617a2359a01a05c1c7e",
  measurementId: "G-MK05ZF6ZCW"
};

let Firebase;
if (firebase.apps.length == 0 ) {
  Firebase = firebase.initializeApp(firebaseConfig);
}
export default Firebase;

// Initialize Firebase
//firebase.initializeApp(firebaseConfig)
//const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);