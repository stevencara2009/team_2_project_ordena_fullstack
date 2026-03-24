import styles from "./Login.module.css"
import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.contentLogin}>
          <div className={styles.formLogin}>
            <form action="" method="POST">
              <h1>Iniciar Sesión</h1>
              <label htmlFor="user-email">Correo Electrónico</label>
              <input type="email" id="user-email" placeholder="henan.c@gmail.com" required className={styles.inputLogin} />
              <label htmlFor="user-password">Contraseña</label>
              <input type="password" id="user-password" placeholder="**************" required className={styles.inputLogin} />
              <button type="submit" className={styles.buttonLogin}>Ingresar</button>
            </form>

            <p className={styles.inputParagragh}>Al continuar con tu correo aceptas los <Link to="/" className={styles.link}>Términos y Condiciones</Link> y el <Link to="/" className={styles.link} >Aviso de Privacidad</Link></p>

            <div className={styles.countOptions}>
              <p className={styles.inputParagragh}><Link to="/" className={styles.link}>Olvide mi contraseña</Link></p>
              <p className={styles.inputParagragh}>¿No tienes cuenta? <span><Link to="/" className={styles.link}>Registrate</Link></span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}