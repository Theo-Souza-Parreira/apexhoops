import styles from './Header2.module.css'
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Perfil from '../assets/img/Perfil.png';

function Header2() {
  return (
    <header className={styles.header}>
    
        <Link to="/">
        <IoArrowBackOutline className={styles.icone} />
        </Link>
        <nav className={styles.navbar}>
            {/* Adicionei a classe ativa dinamicamente a cada Link */}
            <Link to="Perfil" ><img src={Perfil} alt='Perfil'/></Link>
        </nav>

    </header>
  )
}

export default Header2;