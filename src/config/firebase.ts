// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCm-ovK60V1_G4V49xzoz5mG6ran3LxOAM',
  authDomain: 'react-shop-4686b.firebaseapp.com',
  projectId: 'react-shop-4686b',
  storageBucket: 'react-shop-4686b.firebasestorage.app',
  messagingSenderId: '219594786975',
  appId: '1:219594786975:web:8ade4224d1c9f4e7df7aaa',
  databaseURL: 'https://react-shop-4686b-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
