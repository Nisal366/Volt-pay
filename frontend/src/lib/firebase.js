"use client";

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyDu9j-EdaiBUc5Tovs0bliWRFSCKfeSQEk",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "voltpay-3554d.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "voltpay-3554d",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "voltpay-3554d.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    "10337066450",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:10337066450:web:6fcfa6e98c89472f437c0b",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    "G-LKBY48TE2H"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export let analytics = null;

if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch(() => {});

  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {});
}

export default app;
