import { useRef, useState } from "react";
import { Input, InputSelect } from "../../components/Input/Input";
import styles from "./Register.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Button } from '../../components/Button/Button'
import { COUNTRIES } from "../../data/countries.js"
import { Loader } from "../../components/Loader/Loader.jsx";

export const Register = () => {

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    typeDocument: "",
    birthdate: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false
  })
  const navigate = useNavigate();
  // OPCIONES DE INPUTS TIPO SELECT
  const DOCUMENTS_TYPE = ["Cedula de Ciudadanía", "Cedula de Extranjería", "Pasaporte", "NIT"]

  // CAPTURAR DATOS DE FORMULARIO CREACION DE USUARIO
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // ENVIAR DATOS DE FORMULARIO CREACION DE USUARIO
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.typeDocument === "") {
      alert("Selecione un tipo de documento de identidad")
      return
    }
    if (!formData.email.includes('@')) {
      alert("Debes ingresar un correo válido")
      return
    }
    if (formData.phoneNumber.length > 10 || formData.phoneNumber.length < 10) {
      alert("El número de teléfono debe tener 10 dígitos")
      return
    }
    if (formData.nationality === "") {
      alert("Selecione su país de orígen")
      return
    }
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!regex.test(formData.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    const emptyFields = Object.entries(formData).some(([key, value]) => value === "")
    if (emptyFields) {
      alert("Hay campos vacíos")
      return
    }
    if (formData.acceptedTerms === false) {
      alert("Aceptar los términos y condiciones para continuar")
      return
    }
    console.log(`El formulario enviado es: `, formData)
    alert("Te has registrado exitosamente")
    setLoading(true)

    setFormData({
      name: "",
      lastname: "",
      dni: "",
      typeDocument: "",
      birthdate: "",
      email: "",
      phoneNumber: "",
      nationality: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false
    })

    setTimeout(() => {
      setLoading(false)
      navigate('/login')
    }, 2000)

  }

  // ABRIR CALENDARIO CON CLICK EN ICONO
  const dataRef = useRef(null)
  const openCalendar = () => { dataRef.current.showPicker() }

  return (
    <>
      <div className="background">
        <div className={styles.contentRegister}>
          <div className={styles.formRegister}>

            <h1 className={styles.title}>Regístrate</h1>


            <form onSubmit={handleSubmit} >
              <fieldset>
                <legend></legend>
                <div className={styles.displayForm}>
                  <Input
                    label="Nombres"
                    type="text"
                    placeholder="Hernán"
                    className="inputPrimary"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Apellidos"
                    type="text"
                    placeholder="Cortés"
                    className="inputPrimary"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="N° de documento"
                    type="text"
                    placeholder=""
                    className="inputPrimary"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />

                  <InputSelect
                    label="Tipo de documento"
                    className="inputPrimary"
                    name="typeDocument"
                    value={formData.typeDocument}
                    onChange={handleChange}
                    data={DOCUMENTS_TYPE}
                  />

                  <div style={{ display: "flex" }}>
                    <Input
                      ref={dataRef}
                      label="Fecha de Nacimiento"
                      type="date"
                      placeholder=""
                      className="inputPrimary"
                      name="birthdate"
                      value={formData.birthdate}
                      min="1936-04-26"
                      max="2008-04-26"
                      onChange={handleChange}
                      required
                    />
                    <i className={`fa-regular fa-calendar-days ${styles.icon}`} onClick={openCalendar}
                    ></i>
                  </div>

                  <Input
                    label="Correo Electrónico"
                    type="email"
                    placeholder="hernan.c@gmail.com"
                    className="inputPrimary"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Teléfono"
                    type="number"
                    placeholder=""
                    className="inputPrimary"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />

                  <InputSelect
                    label="País de nacimiento"
                    className="inputPrimary"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    data={COUNTRIES}
                  />

                  <div style={{ display: "flex" }}>
                    <Input
                      label="Contraseña"
                      type={!visible ? "password" : "text"}
                      placeholder="**************"
                      className="inputPrimary"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <i className={`fa-solid fa-eye ${styles.icon}`}
                      onClick={() => setVisible(!visible)}
                    ></i>
                  </div>

                  <Input
                    label="Confirme Contraseña"
                    type={!visible ? "password" : "text"}
                    placeholder="**************"
                    className="inputPrimary"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />


                </div>

                <input type="checkbox" id="user-acept_terms" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} /><span className={styles.spanStyle}>  Al continuar, aceptas los <Link to="/index" className={styles.link}>Términos y Condiciones</Link> y el <Link to="/index" className={styles.link} >Aviso de Privacidad</Link></span>
                <Button className='btnRegister' text='Registrarse' type="submit" />


              </fieldset>
            </form>

            {loading && <Loader />}

            <div className={styles.countOptions}>
              <p className={styles.spanStyle}>¿Ya tienes cuenta? <span><Link to="/login" className={styles.link}>Iniciar Sesión</Link></span></p>
              <p className={styles.spanStyle}><Link to="/login" className={styles.link}>Olvidé mi contraseña</Link></p>
            </div>

          </div>
        </div >
      </div >
    </>
  )
}