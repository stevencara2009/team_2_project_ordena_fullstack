import { useState } from "react";
import { Input, InputSelect } from "../../components/Input/Input";
import styles from "./Register.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Button } from '../../components/Button/Button'

export const Register = () => {
  const [filter, setFilter] = useState("")
  const navigate = useNavigate();

  const DOCUMENTS_TYPE = [
    "Cedula de Ciudadanía",
    "Cedula de Extranjería",
    "Pasaporte",
    "NIT",
  ]


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('El formulario fue enviado')
    navigate('/login')
  }

  const handleInputChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <>
      <div className="background">
        <div className={styles.contentRegister}>
          <div className={styles.formRegister}>

            <form action="" onSubmit={handleSubmit} >
              <h1 className={styles.title}>Regístrate</h1>

              <div className={styles.displayForm}>
                <Input
                  label="Nombres"
                  type="text"
                  placeholder="Hernán"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Apellidos"
                  type="text"
                  placeholder="Cortés"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="N° de documento"
                  type="password"
                  placeholder=""
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <InputSelect
                  label="Tipo de documento"
                  type="text"
                  className="inputPrimary"
                  placeholder=""
                  onChange={handleInputChange}
                  data={DOCUMENTS_TYPE}
                />

                <Input
                  label="Fecha de Nacimiento"
                  type="date"
                  placeholder=""
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="hernan.c@gmail.com"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="**************"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

                <Input
                  label="Confirme Contraseña"
                  type="password"
                  placeholder="**************"
                  className="inputPrimary"
                  name=""
                  value=""
                  onChange=""
                  required
                />

              </div>

              <input type="checkbox" id="user-acept_terms" /><span className={styles.spanStyle}>  Al continuar, aceptas los <Link to="/" className={styles.link}>Términos y Condiciones</Link> y el <Link to="/" className={styles.link} >Aviso de Privacidad</Link></span>
              <Button className='btnRegister' text='Registrarse' type="submit" />


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