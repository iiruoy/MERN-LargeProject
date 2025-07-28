import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCSH4uTx5tXkpE-5kVodnZGS6RVjKcYCaY",
  authDomain: "mern-largeproject.firebaseapp.com",
  projectId: "mern-largeproject",
  storageBucket: "mern-largeproject.appspot.com",
  messagingSenderId: "979981239559",
  appId: "1:979981239559:android:12ee11920024b8e82471a2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
