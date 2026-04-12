import { MenuHamburguer } from "../../components/MenuHamburguer/MenuHamburguer"
import styles from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/logo.jpg'

export const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate('/')
  }

  return (
    <nav className={styles.navbar}>
      <div style={{height: "100%", width: "50%", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
        <img src={logo} alt="logo" className={styles.logo} onClick={handleClick} />
      </div>
      <div style={{height: "100%", width: "50%"}}>
        <ul className={styles.menuNavbar}>
          <Link to="/login"><li className={styles.navItem}>Iniciar Sesión</li></Link>
          <Link to="/register" ><li className={styles.navItem} style={{ backgroundColor: "rgb(146, 70, 25)" }}>Regístrate</li></Link>
          <li className={styles.navItem} ><MenuHamburguer /></li>
        </ul>
      </div>
    </nav>
  )
}