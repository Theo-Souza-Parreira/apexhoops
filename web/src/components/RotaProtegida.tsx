import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAutenticacao } from "../hooks/useAutenticacao";

export function RotaProtegida() {
  const {
    autenticado,
    carregando,
  } = useAutenticacao();

  if (carregando) {
    return null;
  }

  if (!autenticado) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default RotaProtegida;