import { useEffect, useState } from "react";
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import { roleRoutes } from "../../utils/roleRoutes";
import { Modal } from "../../components/Modal/Modal";


export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("")

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.includes('@')) {
      alert("Debes ingresar un correo válido")
      return
    }

    setError("")

    const res = await login(form.email, form.password)
    console.log('Respuesta cruda del login:', res)
    if (!res.success) {
      setError(res.message)
      return
    }

    alert("Te has logueado exitosamente")
    setLoading(true)
    console.log('Datos del usuario logueado:', res.user)

    const userRole = res.user?.role || res.user?.rol;

    const ruta = roleRoutes[res.user.role]

    if (!ruta) {
      console.error(`Error: No hay una ruta definida para el rol "${userRole}" en roleRoutes.`);
      setLoading(false)
      setError("Tu usuario no tiene una ruta asignada para su rol.")
      return
    }
    setLoading(false)
    navigate(ruta);
  }

    // FUNCIÓN PARA ENVIAR EL CORREO DE RECUPERACION
    const handleSubmitEmailToRecoverCredencials = (e) => {

      e.preventDefault();
      if (!email.includes('@')) {
        alert("Debes ingresar un correo válido")
        return
      }

      console.log("El correo a recuperar es: ", email)
      alert("Se envió correo de recuperación a ", email)
      setOpenModal(false);
      setEmail("")
    };

    return (
      <>
        <div className="background">
          <div className="container">
            <div className="container-form">

              <h1>Iniciar Sesión</h1>
              <fieldset>
                <legend>Datos de usuario</legend>
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
                    fontSize: "10px"
                  }}>{error}</p>}

                  <Button text="Ingresar" type="submit" className="btnLogin" />
                  {loading && <Loader />}
                </form>
              </fieldset>

              <div className={styles.countOptions}>
                <p className={styles.paragragh}><Link className={styles.link} onClick={() => setOpenModal(!openModal)}>Olvide mi contraseña</Link></p>
                <p className={styles.paragragh}>¿No tienes cuenta? <span><Link to="/register" className={styles.link}>Regístrate</Link></span></p>
              </div>

              {/* Modal Recuperación de credenciales */}
              <Modal isOpenModal={openModal} onCloseModal={() => setOpenModal(!openModal)} onAccept={() => { }} >
                <div style={{ width: "100%", height: "100%", }}>
                  <h3 style={{ color: "black" }}>Recuperar contraseña</h3>
                  <fieldset>
                    <legend>Datos de usuario</legend>
                    <form action="" onSubmit={handleSubmitEmailToRecoverCredencials}>
                      <Input
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        placeholder=""
                        className=""
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant=""
                      />

                      <Button className='btnRegister' text='Solicitar recuperación' type="submit" />
                    </form>
                  </fieldset>
                </div>
              </Modal>

            </div>
          </div>

        </div >
      </>
    )
  }