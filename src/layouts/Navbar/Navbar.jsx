import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className={styles.menuNavbar}>
      <li><Link to="/login" className="">Iniciar Sesión</Link></li>
      <li><Link to="/register" className="">Regístrate</Link></li>
    </nav>
  )
}