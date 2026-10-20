import { initializeApp, FirebaseError, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import {
  initializeAuth,
  getAuth,
  signInWithEmailAndPassword,
  Auth,
} from "firebase/auth";

// @ts-ignore
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const conexao = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Authentication
// initializeAuth só pode ser chamado UMA vez por app.
// No Web, usamos getAuth (usa IndexedDB por padrão, sobrevive ao reload).
// No mobile, usamos initializeAuth com AsyncStorage; se já estiver
// inicializado (hot reload), caímos no getAuth.
//
// Tipamos explicitamente como Auth para evitar "implicit any" (TS7005).
let autenticacao: Auth;

if (Platform.OS === "web") {
  autenticacao = getAuth(conexao);
} else {
  try {
    autenticacao = initializeAuth(conexao, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (erro: any) {
    if (erro?.code === "auth/already-initialized") {
      autenticacao = getAuth(conexao);
    } else {
      throw erro;
    }
  }
}

// Firestore
const banco = getFirestore(conexao);

export { autenticacao, banco, FirebaseError, signInWithEmailAndPassword };