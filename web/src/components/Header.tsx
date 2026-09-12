import { useEffect, useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Logo from "../assets/img/Logo.png";
import styles from "./Header.module.css";

type SecaoHome = "home" | "sobre";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const frameRolagemRef = useRef<number | null>(null);
  const timerAnimacaoRef = useRef<number | null>(null);

  const cancelarAnimacaoPendente = () => {
    if (frameRolagemRef.current !== null) {
      window.cancelAnimationFrame(frameRolagemRef.current);
      frameRolagemRef.current = null;
    }

    if (timerAnimacaoRef.current !== null) {
      window.clearTimeout(timerAnimacaoRef.current);
      timerAnimacaoRef.current = null;
    }
  };

  const animarSecao = (secao: HTMLElement) => {
    secao.removeAttribute("data-animando");

    /*
      Força o navegador a reconhecer que a animação
      terminou antes de iniciá-la novamente.
    */
    void secao.offsetWidth;

    secao.setAttribute("data-animando", "true");

    timerAnimacaoRef.current = window.setTimeout(() => {
      secao.removeAttribute("data-animando");
      timerAnimacaoRef.current = null;
    }, 1000);
  };

  const aguardarFimDaRolagem = (
    secao: HTMLElement,
    destino: number,
  ) => {
    const inicio = performance.now();

    const verificarPosicao = () => {
      const distancia = Math.abs(window.scrollY - destino);
      const tempoDecorrido = performance.now() - inicio;

      /*
        A animação começa quando a página realmente
        chegou próxima ao destino.
      */
      if (distancia <= 5 || tempoDecorrido >= 1500) {
        frameRolagemRef.current = null;
        animarSecao(secao);
        return;
      }

      frameRolagemRef.current =
        window.requestAnimationFrame(verificarPosicao);
    };

    frameRolagemRef.current =
      window.requestAnimationFrame(verificarPosicao);
  };

  const rolarParaSecao = (id: SecaoHome) => {
    const secao = document.getElementById(id);

    if (!secao) {
      return;
    }

    cancelarAnimacaoPendente();

    const header = document.querySelector("header");

    const alturaHeader =
      header?.getBoundingClientRect().height ?? 0;

    const destino =
      id === "home"
        ? 0
        : secao.getBoundingClientRect().top +
          window.scrollY -
          alturaHeader -
          24;

    const destinoSeguro = Math.max(0, destino);

    /*
      Se já estiver praticamente na seção,
      apenas reinicia a animação.
    */
    if (
      Math.abs(window.scrollY - destinoSeguro) <= 5
    ) {
      animarSecao(secao);
      return;
    }

    window.scrollTo({
      top: destinoSeguro,
      behavior: "smooth",
    });

    aguardarFimDaRolagem(
      secao,
      destinoSeguro,
    );
  };

  const navegarParaSecao = (id: SecaoHome) => {
    const hashDestino =
      id === "home" ? "" : "#sobre";

    const jaEstaNoDestino =
      location.pathname === "/" &&
      location.hash === hashDestino;

    /*
      Se a URL não mudar, fazemos a navegação
      e a animação manualmente.
    */
    if (jaEstaNoDestino) {
      rolarParaSecao(id);
      return;
    }

    const destino =
      id === "home"
        ? "/"
        : "/#sobre";

    navigate(destino);
  };

  /*
    Executado quando React Router altera
    a URL entre / e /#sobre.
  */
  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const id: SecaoHome =
      location.hash === "#sobre"
        ? "sobre"
        : "home";

    const frame = window.requestAnimationFrame(() => {
      rolarParaSecao(id);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    return () => {
      cancelarAnimacaoPendente();
    };
  }, []);

  const homeAtiva =
    location.pathname === "/" &&
    location.hash !== "#sobre";

  const sobreAtiva =
    location.pathname === "/" &&
    location.hash === "#sobre";

  const checkIsActive = (path: string) => {
    return location.pathname === path
      ? styles.active
      : "";
  };

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logo}
        onClick={(event) => {
          event.preventDefault();
          navegarParaSecao("home");
        }}
      >
        <img
          src={Logo}
          alt="Logo ApexHoops"
        />
      </Link>

      <nav
        className={styles.navbar}
        aria-label="Navegação principal"
      >
        <Link
          to="/"
          className={`${styles.navLink} ${
            homeAtiva ? styles.active : ""
          }`}
          onClick={(event) => {
            event.preventDefault();
            navegarParaSecao("home");
          }}
        >
          HOME
        </Link>

        <Link
          to="/#sobre"
          className={`${styles.navLink} ${
            sobreAtiva ? styles.active : ""
          }`}
          onClick={(event) => {
            event.preventDefault();
            navegarParaSecao("sobre");
          }}
        >
          SOBRE
        </Link>

        <Link
          to="/baixar"
          className={`${styles.navLink} ${checkIsActive(
            "/baixar"
          )}`}
        >
          BAIXE
        </Link>

        <Link
          to="/cadastrar"
          className={`${styles.loginButton} ${checkIsActive(
            "/cadastrar"
          )}`}
        >
          ENTRAR
        </Link>
      </nav>
    </header>
  );
}

export default Header;