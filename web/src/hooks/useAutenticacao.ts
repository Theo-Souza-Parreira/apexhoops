import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

export function useAutenticacao() {
  const contexto =
    useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAutenticacao deve ser utilizado dentro de AuthProvider.",
    );
  }

  return contexto;
}