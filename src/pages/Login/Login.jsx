import { useEffect, useState } from "react";
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import { roleRoutes } from "../../utils/roleRoutes";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.error(error)
  }, [error])

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.includes('@')) {
      alert("Debes ingresar un correo válido")
      return
    }

    const res = login(form.email, form.password)

    if (!res.success) {
      setError(res.message)
      return
    }

    
    console.log('El formulario fue enviado:', form)
    alert("Te has logueado exitosamente")
    setLoading(true)
    const ruta = roleRoutes[res.user.rol]
    setTimeout(() => {
      setLoading(false)
      navigate(ruta);
    }, 2000)
  }

  return (
    <>
      <div className="background">
        <div className={styles.contentLogin}>
          <div className={styles.formLogin}>

            <h1>Iniciar Sesión</h1>
            <fieldset>
              <legend></legend>
              <form action="" onSubmit={handleSubmit}>
                <Input
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  placeholder="henan.c@gmail.com"
                  className="inputPrimary"
                  required
                  value={form.email}
                  onChange={handleChange}
                />

                <Input
                  label="Contraseña"
                  name="password"
                  type="password"
                  placeholder="**************"
                  className="inputPrimary"
                  required
                  value={form.password}
                  onChange={handleChange}
                />

                {error && <p style={{
                  color: "red",
                  fontSize: "10px"}}>{error}</p>}

              <Button text="Ingresar" type="submit" className="btnLogin" />
              {loading && <Loader />}
            </form>
          </fieldset>

          <div className={styles.countOptions}>
            <p className={styles.paragragh}><Link to="/index" className={styles.link}>Olvide mi contraseña</Link></p>
            <p className={styles.paragragh}>¿No tienes cuenta? <span><Link to="/register" className={styles.link}>Regístrate</Link></span></p>
          </div>

        </div>
      </div>

    </div >
    </>
  )
}