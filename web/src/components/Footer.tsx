import estilos from "./Footer.module.css";

function Footer() {
  return (
    <footer className={estilos.conteiner}>
      <div className={estilos.topo}>
        <div className={estilos.brand}>
          <h3 className={estilos.logoTxt}>ApexHoops</h3>
          <p>
            Democratizando o acesso ao treinamento de basquete através da
            tecnologia.
          </p>
        </div>

        <nav className={estilos.footerNav}>
          <a href="/">Home</a>
          <a href="/sobre">Sobre</a>
          <a href="/login">Login</a>
          <a href="/suporte">Suporte</a>
        </nav>
      </div>

      <div className={estilos.divisor}></div>

      <div className={estilos.base}>
        <p>
          © 2026 <span className={estilos.logoTxt}>ApexHoops </span>. Todos os
          direitos reservados.
        </p>

        <div className={estilos.linksSecundarios}>
          <a href="/termos">Termos de Uso</a>
          <span>•</span>
          <a href="/privacidade">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;