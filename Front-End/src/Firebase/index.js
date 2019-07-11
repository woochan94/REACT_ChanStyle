import firebase from "firebase/app";
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STOREBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENERID,
    appId: process.env.REACT_APP_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };