// Header2.tsx

import { Link } from "react-router-dom";

import estilos from "./Header2.module.css";

type Header2Props = {
  nome: string;
  fotoPerfil?: string;
};

export function Header2({
  nome,
  fotoPerfil,
}: Header2Props) {
  const primeiroNome =
    nome.trim().split(/\s+/)[0] || "Atleta";

  const inicial =
    primeiroNome.charAt(0).toUpperCase();

  return (
    <header className={estilos.header}>
      <div className={estilos.boasVindas}>
        <h1>
          Olá, <span>{primeiroNome}</span>
        </h1>

        <p>
          Pronto para evoluir hoje?
        </p>
      </div>

      <Link
        to="/perfil"
        className={estilos.perfilBotao}
        aria-label="Ir para o perfil"
      >
        <div className={estilos.avatar}>
          {fotoPerfil ? (
            <img
              src={fotoPerfil}
              alt={`Foto de perfil de ${primeiroNome}`}
            />
          ) : (
            <span aria-hidden="true">
              {inicial}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header2;