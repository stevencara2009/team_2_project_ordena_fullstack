import styles from "./Register.module.css"
import { Link } from "react-router-dom"

export const Register = () => {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.contentRegister}>
          <div className={styles.formRegister}>

            <form action="" method="POST" >
              <h1 className={styles.title}>Regístrate</h1>

              <div className={styles.displayForm}>
                <label htmlFor="user-name">Nombres
                  <input type="text" id="user-name" placeholder="Hernán" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-lastname">Apellidos
                  <input type="text" id="user-name" placeholder="Cortés" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-number-document">N° de documento
                  <input type="password" id="user-number-document" placeholder="**************" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-type-document">Tipo
                  <select id="user-type-document" className={styles.inputRegister}>
                    <option value="">Cedula de Ciudadanía</option>
                    <option value="">Cedula de Extranjería</option>
                    <option value="">Pasaporte</option>
                    <option value="">NIT</option>
                  </select>
                </label>

                <label htmlFor="user-birthdate">Fecha de Nacimiento
                  <input type="date" id="user-birthdate" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-email">Correo Electrónico
                  <input type="email" id="user-email" placeholder="hernan.c@gmail.com" required className={styles.inputRegister} />
                </label>


                <label htmlFor="user-password">Contraseña
                  <input type="password" id="user-password" placeholder="**************" required className={styles.inputRegister} />
                </label>

                <label htmlFor="user-confirm-password">Confirme Contraseña
                  <input type="password" id="user-confirm-password" placeholder="**************" required className={styles.inputRegister} />
                </label>

              </div>

              <input type="checkbox" id="user-acept_terms" /><span className={styles.spanStyle}>  Al continuar, aceptas los <Link to="/" className={styles.link}>Términos y Condiciones</Link> y el <Link to="/" className={styles.link} >Aviso de Privacidad</Link></span>


              <button type="submit" className={styles.buttonRegister}>Registrarse</button>


            </form>

            <div className={styles.countOptions}>
              <p className={styles.spanStyle}>¿Ya tienes cuenta? <span><Link to="/" className={styles.link}>Iniciar Sesión</Link></span></p>
              <p className={styles.spanStyle}><Link to="/" className={styles.link}>Olvidé mi contraseña</Link></p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}