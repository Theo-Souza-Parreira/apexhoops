import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { bancoDados } from "../firebase/Firebase";

import type {
  UsuarioTipo,
} from "../types/Usuario";

export type CriarUsuarioDados = Pick<
  UsuarioTipo,
  "uid" | "nome" | "email"
>;

export type AtualizarUsuarioDados =
  Partial<
    Omit<
      UsuarioTipo,
      "uid" | "email"
    >
  >;

const COLECAO_USUARIOS =
  "usuarios";

export async function criarUsuario(
  dados: CriarUsuarioDados,
): Promise<void> {
  const referenciaUsuario = doc(
    bancoDados,
    COLECAO_USUARIOS,
    dados.uid,
  );

  const usuario: UsuarioTipo = {
    uid: dados.uid,
    nome: dados.nome,
    email: dados.email,
    perfilCompleto: false,
  };

  await setDoc(
    referenciaUsuario,
    usuario,
  );
}

export async function buscarUsuario(
  uid: string,
): Promise<UsuarioTipo | null> {
  const referenciaUsuario = doc(
    bancoDados,
    COLECAO_USUARIOS,
    uid,
  );

  const documento =
    await getDoc(referenciaUsuario);

  if (!documento.exists()) {
    return null;
  }

  return documento.data() as UsuarioTipo;
}

export async function atualizarUsuario(
  uid: string,
  dados: AtualizarUsuarioDados,
): Promise<void> {
  const referenciaUsuario = doc(
    bancoDados,
    COLECAO_USUARIOS,
    uid,
  );

  await updateDoc(
    referenciaUsuario,
    dados,
  );
}