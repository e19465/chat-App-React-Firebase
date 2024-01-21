import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu4lqesDbBmpVSqgngDvyo4Z27QlRVAKE",
  authDomain: "chat-ee7b4.firebaseapp.com",
  projectId: "chat-ee7b4",
  storageBucket: "chat-ee7b4.appspot.com",
  messagingSenderId: "794101578883",
  appId: "1:794101578883:web:c7850022ee1cbde5c9efb6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
