
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";

import { autenticacao } from "../firebase/Firebase";

export async function criarConta(
  email: string,
  senha: string,
): Promise<UserCredential> {
  const credencial = await createUserWithEmailAndPassword(
    autenticacao,
    email,
    senha,
  );

  try {
    await sendEmailVerification(credencial.user);
  } catch (error) {
    await signOut(autenticacao);
    throw error;
  }

  return credencial;
}

export async function entrar(
  email: string,
  senha: string,
): Promise<UserCredential> {
  const credencial = await signInWithEmailAndPassword(
    autenticacao,
    email,
    senha,
  );

  await credencial.user.reload();

  if (!credencial.user.emailVerified) {
    await signOut(autenticacao);

    throw new Error("EMAIL_NAO_VERIFICADO");
  }

  return credencial;
}

export async function recuperarSenha(
  email: string,
): Promise<void> {
  await sendPasswordResetEmail(
    autenticacao,
    email,
  );
}


export async function sair(): Promise<void> {
  await signOut(autenticacao);
}
