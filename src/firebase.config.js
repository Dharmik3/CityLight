import { getApp, getApps, initializeApp } from 'firebase/app'
import {getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCN0KeP6UGT7d6XyCDrRqhfQT631fuSYqk",
  authDomain: "restaurant-app-3.firebaseapp.com",
  databaseURL: "https://restaurant-app-3-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-3",
  storageBucket: "restaurant-app-3.appspot.com",
  messagingSenderId: "555768152019",
  appId: "1:555768152019:web:31e133e22b661bfb28f926"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };