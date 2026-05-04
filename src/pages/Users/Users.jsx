import { Button } from '../../components/Button/Button'
import { Input, InputSelect } from '../../components/Input/Input'
import { UserItem } from './UserItem/UserItem'
import styles from './Users.module.css'
import { useEffect, useRef, useState } from 'react'
import { COUNTRIES } from "../../data/countries.js"
import { Loader } from '../../components/Loader/Loader.jsx'

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState("Todos")
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
    confirmPassword: ""
  })

  // OPCIONES DE INPUTS TIPO SELECT
  const USERS_TYPE = ["Todos", "Mesero", "Cocinero", "Administrador", "Cliente"]
  const DOCUMENTS_TYPE = ["Cedula de Ciudadanía", "Cedula de Extranjería", "Pasaporte", "NIT"]

  // API GET: OBTENER DATOS DE USUARIOS
  useEffect(() => {
    fetch('/api/users.json')
      .then(response => response.json())
      .then(result => {
        setUsers(result)
      })
      .catch(error => console.log("Error cargando archivo: ", error))
  }, [users])

  // FILTRAR DATOS DE USUARIOS
  const usersFiltered = users.filter((user) => {
    if (userType === "" || userType === "Todos") return true;
    return user.role === userType;
  })

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

    console.log(`El formulario enviado es: `, formData)
    alert("Usuario creado correctamente: ", formData.name)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

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

  }

  // ABRIR CALENDARIO CON CLICK EN ICONO
  const dataRef = useRef(null)
  const openCalendar = () => { dataRef.current.showPicker() }

  return (
    <div className="background">
      <div className="container">
        <h1>Usuarios</h1>

        <form >
          <fieldset className="formFlex">
            <legend></legend>
            <Input
              label="Buscar"
              type="text"
              placeholder=""
              className="inputPrimary"
              name="userName"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />

            <div className={styles.divSearch}>
              <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
            </div>

            <InputSelect
              label="Filtrar por:"
              type="text"
              className="inputPrimary"
              name="userType"
              value={userType}
              placeholder=""
              onChange={(e) => setUserType(e.target.value)}
              data={USERS_TYPE}
            />
          </fieldset>
        </form>

        <div className="contentFlex">
          {/* Modulo Usuarios */}
          <div className="module">
            <UserItem users={usersFiltered} />
          </div>

          {/* Modulo Formulario Nuevo Usuario*/}
          <div className="module">
            {loading ? <Loader /> : (<form onSubmit={handleSubmit}>
              <fieldset>
                <legend></legend>

                <h2>Usuario</h2>
                <div className={styles.displayForm}>
                  <Input
                    label="Nombres"
                    type="text"
                    placeholder=""
                    className="inputPrimary"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Apellidos"
                    type="text"
                    placeholder=""
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
                    placeholder=""
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

                  <div className={styles.divActionsOrder}>
                    <Button text='Eliminar' className='btnDelete' />
                    <Button text='Añadir' className='btnAdd' type='submit' />
                  </div>

                </div>

              </fieldset>
            </form>)}
          </div>

        </div>

      </div>
    </div>
  )
}