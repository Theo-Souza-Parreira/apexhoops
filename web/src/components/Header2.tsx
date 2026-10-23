import { Link } from "react-router-dom";

import { useAutenticacao } from "../hooks/useAutenticacao";

import estilos from "./Header2.module.css";

export function Header2() {
  const { perfil } = useAutenticacao();

  const nome = perfil?.nome?.trim() || "Atleta";

  const primeiroNome =
    nome.split(/\s+/)[0] || "Atleta";

  const fotoPerfil = perfil?.fotoPerfil;

  const frasePerfil =
    perfil?.frasePerfil ||
    "Evoluir um treino de cada vez.";

  const inicial =
    primeiroNome.charAt(0).toUpperCase();

  return (
    <header className={estilos.header}>
      <div className={estilos.boasVindas}>
        <h1>
          Olá, <span>{primeiroNome}</span>
        </h1>

        <p>Pronto para evoluir hoje?</p>
      </div>

      <Link
        to="/perfil"
        className={estilos.perfilBotao}
        aria-label="Ir para o perfil"
      >
        <div className={estilos.perfilTexto}>
          <strong>Atleta Apex Hoops</strong>

          <span>{frasePerfil}</span>
        </div>

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
