import styles from './Header.module.css'
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/img/Logo.png'

function Header() {
  const location = useLocation();

  // Função que devolve a classe active se a rota tiver q nem o link
  const checkIsActive = (path: string) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}><img src={Logo} alt="Logo ApexHoops" /></Link>

      <nav className={styles.navbar}>
        {/* Adicionamos a classe ativa dinamicamente a cada Link */}
        <Link to="/" className={`${styles.navLink} ${checkIsActive('/')}`}>Sobre</Link>
        <Link to="/baixar" className={`${styles.navLink} ${checkIsActive('/baixar')}`}>Baixe</Link>
        <Link to="/contato" className={`${styles.navLink} ${checkIsActive('/contato')}`}>Contato</Link>
        
        <Link to="/login" className={`${styles.loginButton} ${checkIsActive('/login')}`}>
          Entrar
        </Link>
      </nav>
    </header>
  )
}

export default Header;