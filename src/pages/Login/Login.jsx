import { useState } from "react";
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('El formulario fue enviado:', formData)
    setFormData({
      email: "",
      password: ""
    })
    navigate('/dashboard')
  }

  return (
    <>
      <div className="background">
        <div className={styles.contentLogin}>
          <div className={styles.formLogin}>

            <form action="" onSubmit={handleSubmit}>
              <h1>Iniciar Sesión</h1>
              <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                placeholder = "henan.c@gmail.com"
                className="inputLogin"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder = "**************"
                className="inputLogin"
                required
                value={formData.password}
                onChange={handleChange}
              />

              <Button text="Ingresar" type="submit" className="btnLogin" />
            </form>

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