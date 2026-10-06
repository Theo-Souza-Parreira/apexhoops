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
        <div className={estilos.links}>
          <a href="#">Termos de Uso</a>
          <span>•</span>
          <a href="#">Política de Privacidade</a>
        </div>

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