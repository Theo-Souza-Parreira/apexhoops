import estilos from './Footer.module.css'

function Footer() {
  return (
    <footer className={estilos.conteiner}>
      {/* Lado Esquerdo: Copyright e Marca */}
      <p className={estilos.copyright}>
        © 2026 <span className={estilos.logoTxt}>ApexHoops</span>. Todos os direitos reservados.
      </p>

      {/* Lado Direito: Links secundários */}
      <nav className={estilos.footerNav}>
        <a href="/">Termos de Uso</a>
        <a href="/">Privacidade</a>
        <a href="/">Suporte</a>
      </nav>
    </footer>
  )
}

export default Footer;