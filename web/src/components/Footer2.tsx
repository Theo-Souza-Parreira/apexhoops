import estilos from "./Footer2.module.css";

export function Footer2() {
  const anoAtual =
    new Date().getFullYear();

  return (
    <footer className={estilos.footer}>
      <div className={estilos.marca}>
        <strong>
          Apex <span>Hoops</span>
        </strong>

        <p>
          Transformando atletas através de treino,
          disciplina e tecnologia.
        </p>
      </div>

      <div className={estilos.informacoes}>
        <nav
          className={estilos.links}
          aria-label="Informações institucionais"
        >

          <span>Termos de Uso</span>

          <span>Privacidade</span>
        </nav>

        <div
          className={estilos.divisor}
          aria-hidden="true"
        />

        <p className={estilos.direitos}>
          © {anoAtual} Apex Hoops.
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer2;