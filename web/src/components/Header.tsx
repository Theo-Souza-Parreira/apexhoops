  import styles from './Header.module.css'

  function Header() {
    return (
      <header className={styles.header}>
        <a href="/" className={styles.logo}> ApexHoops </a>

        <nav className={styles.navbar}>

          <a href="/">Sobre</a>
          <a href="/">Baixe</a>
          <a href="/">Contato</a>
          <a href="login">Entrar</a>

        </nav>
      </header>
    )
  }

  export default Header