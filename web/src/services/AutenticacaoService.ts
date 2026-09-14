import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";

import { autenticacao } from "../firebase/Firebase";

export async function criarConta(
  email: string,
  senha: string,
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(
    autenticacao,
    email,
    senha,
  );
}

export async function entrar(
  email: string,
  senha: string,
): Promise<UserCredential> {
  return signInWithEmailAndPassword(
    autenticacao,
    email,
    senha,
  );
}

export async function sair(): Promise<void> {
  await signOut(autenticacao);
}