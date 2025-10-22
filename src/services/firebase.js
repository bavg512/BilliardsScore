import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY || 'demo-api-key',
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId:
    Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID || 'demo-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
