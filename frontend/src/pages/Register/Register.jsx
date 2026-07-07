import { useRef, useState } from "react";
import { Input, InputSelect } from "../../components/Input/Input";
import styles from "./Register.module.css"
import { Link, useNavigate } from "react-router-dom"
import { Button } from '../../components/Button/Button'
import { DOCUMENTS_TYPE, COUNTRIES } from "../../data/options.js"
import { Loader } from "../../components/Loader/Loader.jsx";
import { Modal } from "../../components/Modal/Modal.jsx";
import { useClients } from "../../hooks/useClients.js";
import { ClientCreateForm } from "./ClientCreateForm.jsx";


export const Register = () => {

  const [openModal, setOpenModal] = useState(false)
  const [openModalRecoverPassword, setOpenModalRecoverPassword] = useState(false)
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const {
    loading,
    addClient,
  } = useClients();

  // ESTADO FORMULARIO CREACIÓN (POST)
  const [createFormData, setCreateFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    typeDocument: "",
    email: "",
    password: "",
    phone: "",
    nationality: "",
    image: "",
    active: true,
    birthdate: "",
    confirmPassword: "",
    acceptedTerms: false
  })

  // CAPTURAR DATOS DE FORMULARIO CREACION DE USUARIO
  const handleChangeCreate = (e) => {
    const { name, value, type, checked } = e.target
    setCreateFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // ENVIAR DATOS DE FORMULARIO CREACION DE USUARIO
  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (createFormData.name === "" || createFormData.lastname === "") {
      alert("Debes ingresar nombres y apellidos")
      return
    }
    if (!createFormData.typeDocument || createFormData.typeDocument === "") {
      alert("Seleccione un tipo de documento de identidad")
      return
    }
    if (!createFormData.dni || createFormData.dni === "") {
      alert("Debes ingresar número de documento de identidad")
      return
    }
    if (!createFormData.email || !createFormData.email.includes('@')) {
      alert("Debes ingresar un correo válido")
      return
    }
    if (!createFormData.phone || createFormData.phone.length > 10 || createFormData.phone.length < 10) {
      alert("El número de teléfono debe tener 10 dígitos")
      return
    }
    if (!createFormData.nationality || createFormData.nationality === "") {
      alert("Seleccione su país de orígen")
      return
    }
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!regex.test(createFormData.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial");
      return;
    }
    if (createFormData.password !== createFormData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (createFormData.acceptedTerms === false) {
      alert("Debes aceptar los términos y condiciones para continuar")
      return
    }

    console.log(`El formulario enviado es: `, createFormData)
    alert("Te has registrado exitosamente")

    try {
      // Sanitizamos el objeto antes de enviarlo
      const data = {
        ...createFormData,
        typeDocument: createFormData?.typeDocument?.toUpperCase(),
        active: Boolean(createFormData.active),
        birthdate: createFormData.birthdate ? new Date(createFormData.birthdate).toISOString() : null
      }

      await addClient(data);
      setOpenModal(false)
      alert(`Se ha creado el usuario "${createFormData.name} ${createFormData.lastname}" con éxito`);

      // Limpiar el detalle tras eliminar
      setCreateFormData({
        name: "",
        lastname: "",
        dni: "",
        typeDocument: "",
        email: "",
        password: "",
        phone: "",
        nationality: "",
        image: "",
        active: true,
        birthdate: "",
        confirmPassword: ""
      })
      navigate('/login')
    } catch (error) {
      console.error(error);
    }

  }

  // ABRIR CALENDARIO CON CLICK EN ICONO
  const dataRef = useRef(null)
  const openCalendar = () => { dataRef.current.showPicker() }


  // FUNCIÓN PARA CAMBIAR EL CHECK A TRUE DENTRO DEL MODAL
  const handleAcceptTerms = () => {
    setCreateFormData({
      ...createFormData,
      acceptedTerms: true // Cambia el checkbox a marcado
    });
    setOpenModal(false);
  };


  // FUNCIÓN PARA ENVIAR EL CORREO DE RECUPERACION
  const handleSubmitEmailToRecoverCredencials = (e) => {

    e.preventDefault();
    if (!email.includes('@')) {
      alert("Debes ingresar un correo válido")
      return
    }

    console.log("El correo a recuperar es: ", email)
    alert("Se envió correo de recuperación a ", email)
    setOpenModalRecoverPassword(false);
    setEmail("")
  };


  return (
    <div className="background">
      <div className="container">
        <div className="container-form">

          <h1>Regístrate</h1>
          
          {/* Formulario Cliente (POST) */}
          <ClientCreateForm
            createFormData={createFormData}
            handleChangeCreate={handleChangeCreate}
            handleSubmitCreate={handleSubmitCreate}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />

          {/* Opciones de Inicio de sesión */}
          <div className={styles.countOptions}>
            <p className={styles.spanStyle}>¿Ya tienes cuenta? <span><Link to="/login" className={styles.link}>Iniciar Sesión</Link></span></p>
            <p className={styles.spanStyle}><Link className={styles.link} onClick={() => setOpenModalRecoverPassword(!openModalRecoverPassword)}>Olvidé mi contraseña</Link></p>
          </div>

          {/* Modal Términos y condiciones */}
          <Modal isOpenModal={openModal} onCloseModal={() => setOpenModal(!openModal)} onAccept={handleAcceptTerms} >
            <div style={{ width: "100%", height: "100%", }}>
              <h3 style={{ color: "black" }}>Términos y condiciones</h3>
              <h4>1. Aceptación de los términos</h4>
              <p>Al descargar, instalar o utilizar la aplicación, el usuario acepta de forma expresa el presente acuerdo. Si no está de acuerdo, debe abstenerse de usarla. </p>

              <h4>2. Uso de la aplicación y restricciones</h4>
              <p>Se otorga una licencia limitada, no exclusiva e intransferible para uso personal.Está prohibido modificar, realizar ingeniería inversa, extraer bases de datos (uso de bots) o utilizar la app para fines ilícitos.</p>

              <h4>3. Propiedad intelectual</h4>
              <p>Todo el contenido, diseño, logotipos, códigos y material de la app son propiedad exclusiva de (Tu Nombre o Empresa).</p>

              <h4>4. Privacidad y tratamiento de datos</h4>
              <p>El uso de la aplicación se rige por nuestra Política de Privacidad. El usuario autoriza el acceso a permisos necesarios (como ubicación, cámara o notificaciones) para el correcto funcionamiento de la app.</p>

              <h4>5. Limitación de responsabilidad</h4>
              <p>El desarrollador no se hace responsable de daños directos, indirectos o incidentales derivados del uso o la imposibilidad de uso de la aplicación, ni de fallos en dispositivos de terceros.</p>

              <h4>6. Modificaciones</h4>
              <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las actualizaciones serán notificadas dentro de la app o por correo electrónico.</p>

              <Button className='btnRegister' text='Aceptar' type="button" onClick={handleAcceptTerms} />
            </div>
          </Modal>


          {/* Modal Recuperación de credenciales */}
          <Modal isOpenModal={openModalRecoverPassword} onCloseModal={() => setOpenModalRecoverPassword(!openModalRecoverPassword)} onAccept={() => { }} >
            <div style={{ width: "100%", height: "100%", }}>
              <h3 style={{ color: "black" }}>Recuperar contraseña</h3>
              <fieldset>
                <legend>Datos</legend>
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

          {loading && <Loader />}
        </div>
      </div >
    </div >
  )
}