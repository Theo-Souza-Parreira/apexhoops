import { initializeApp, FirebaseError, getApps, getApp } from 'firebase/app'
import { initializeAuth, signInWithEmailAndPassword, inMemoryPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

// Evita duplicidade no Fast Refresh do Expo
const conexao = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Força o Firebase a usar persistência em memória. 
// Por ser somente um teste de conexão, não salva os dados do usuário no AsyncStorage e silencia o aviso no terminal
const autenticacao = initializeAuth(conexao, {
  persistence: inMemoryPersistence
})

export { autenticacao, FirebaseError, signInWithEmailAndPassword }