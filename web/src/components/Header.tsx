  import styles from './Header.module.css'
  import { Link } from "react-router-dom";

  function Header() {
    return (
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>ApexHoops</Link>

        <nav className={styles.navbar}>
          <Link to="/">Sobre</Link>
          <Link to="/">Baixe</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/login" className={styles.loginButton}>
            Entrar
          </Link>
        </nav>

      </header>
    )
  }

  export default Header