import * as firebase from 'firebase'

export const firebaseConfig = {
    apiKey: "AIzaSyASonZ6DlS2cqTonbPSiq8RboZFv4bYKDE",
    authDomain: "kabfiapp.firebaseapp.com",
    databaseURL: "https://kabfiapp-default-rtdb.firebaseio.com",
    projectId: "kabfiapp",
    storageBucket: "kabfiapp.appspot.com",
    messagingSenderId: "676638158064",
    appId: "1:676638158064:web:e01ff8bc3a12a378eee635"
};

const kabfiApp = firebase.initializeApp(firebaseConfig);



export default kabfiApp;