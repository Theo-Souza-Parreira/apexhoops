import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Lê a chave indicada em GOOGLE_APPLICATION_CREDENTIALS (.env)
initializeApp({ credential: applicationDefault() });

export const banco = getFirestore();