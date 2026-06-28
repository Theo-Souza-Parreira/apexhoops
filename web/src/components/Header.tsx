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
        {/* Adicionei a classe ativa dinamicamente a cada Link */}
        <Link to="/" className={`${styles.navLink} ${checkIsActive('/')}`}>HOME</Link>
        <Link to="/sobre" className={`${styles.navLink} ${checkIsActive('/sobre')}`}>SOBRE</Link>
        <Link to="/baixar" className={`${styles.navLink} ${checkIsActive('/baixar')}`}>BAIXE</Link>
        <Link to="/contato" className={`${styles.navLink} ${checkIsActive('/contato')}`}>CONTATO</Link>
        
        <Link to="/login" className={`${styles.loginButton} ${checkIsActive('/login')}`}>
          ENTRAR
        </Link>
      </nav>
    </header>
  )
}

export default Header;