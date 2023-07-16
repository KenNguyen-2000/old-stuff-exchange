// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBQcLNalXBYH2Hlq-r6sfEQFI_5DqbgYqw',
  authDomain: 'old-stuff-exchange-389800.firebaseapp.com',
  projectId: 'old-stuff-exchange-389800',
  storageBucket: 'old-stuff-exchange-389800.appspot.com',
  messagingSenderId: '767306425751',
  appId: '1:767306425751:web:18f5c9023b7ad9356710d2',
  measurementId: 'G-SXJ7WEFKJ3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, firebase, storage };
