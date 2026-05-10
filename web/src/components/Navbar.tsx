import styles from './Navbar.module.css'

function Navbar() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}> ApexHoops </a>

      <nav className={styles.navbar}>

        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Services</a>
        <a href="/">Contact</a>

      </nav>
    </header>
  )
}

export default Navbar