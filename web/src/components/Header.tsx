// Header.tsx

import { Link, useLocation } from "react-router-dom";

import Logo from "../assets/img/Logo.png";
import styles from "./Header.module.css";

function Header() {
  const location = useLocation();

  const rolarParaTopo = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const estaAtiva = (path: string) =>
    location.pathname === path ? styles.active : "";

  const homeAtiva = location.pathname === "/";

  /*
    O indicador laranja fica em ENTRAR somente
    na rota /login.

    Nas demais páginas permanece em CRIAR CONTA.
  */
  const entrarAtivo = location.pathname === "/login";

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logo}
        onClick={(event) => {
          if (location.pathname !== "/") {
            return;
          }

          event.preventDefault();
          rolarParaTopo();
        }}
      >
        <img
          src={Logo}
          alt="Logo Apex Hoops"
        />
      </Link>

      <nav
        className={styles.navbar}
        aria-label="Navegação principal"
      >
        <div className={styles.linksPrincipais}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              homeAtiva ? styles.active : ""
            }`}
            onClick={(event) => {
              if (location.pathname !== "/") {
                return;
              }

              event.preventDefault();
              rolarParaTopo();
            }}
          >
            HOME
          </Link>

          <Link
            to="/baixar"
            className={`${styles.navLink} ${estaAtiva("/baixar")}`}
          >
            BAIXE
          </Link>
        </div>

        <div
          className={`${styles.acoesConta} ${
            entrarAtivo
              ? styles.acoesEntrar
              : styles.acoesCriar
          }`}
          aria-label="Acesso à conta"
        >
          <span
            className={styles.indicadorConta}
            aria-hidden="true"
          />

          <Link
            to="/login"
            className={styles.botaoConta}
            aria-current={
              entrarAtivo ? "page" : undefined
            }
          >
            ENTRAR
          </Link>

          <Link
            to="/cadastrar"
            className={styles.botaoConta}
            aria-current={
              location.pathname === "/cadastrar"
                ? "page"
                : undefined
            }
          >
            CADASTRAR
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;