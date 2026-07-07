import styles from "./Register.module.css"
import { Input, InputSelect } from '../../components/Input/Input'
import { USERS_TYPE, DOCUMENTS_TYPE, COUNTRIES } from "../../data/options.js"
import { Button } from '../../components/Button/Button'
import { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

export const ClientCreateForm = ({ createFormData, handleChangeCreate, handleSubmitCreate, openModal, setOpenModal }) => {

  const [visible, setVisible] = useState(false)
  // ABRIR CALENDARIO CON CLICK EN ICONO
  const dataRef = useRef(null)
  const openCalendar = () => { dataRef.current.showPicker() }

  return (
    <>
      <form onSubmit={handleSubmitCreate} >
        <fieldset>
          <legend> Información personal </legend>

          <Input
            label="Nombres"
            type="text"
            placeholder=""
            className="inputPrimary"
            name="name"
            value={createFormData.name}
            onChange={handleChangeCreate}
            required
          />

          <Input
            label="Apellidos"
            type="text"
            placeholder=""
            className="inputPrimary"
            name="lastname"
            value={createFormData.lastname}
            onChange={handleChangeCreate}
            required
          />

          <Input
            label="N° de documento"
            type="text"
            placeholder=""
            className="inputPrimary"
            name="dni"
            value={createFormData.dni}
            onChange={handleChangeCreate}
            required
          />

          <InputSelect
            label="Tipo de documento"
            className="inputPrimary"
            name="typeDocument"
            value={createFormData.typeDocument}
            onChange={handleChangeCreate}
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
              value={createFormData.birthdate}
              min="1936-04-26"
              max="2008-04-26"
              onChange={handleChangeCreate}
              required
            />
            <div className={`${styles.icon}`}>
              <i className={`fa-regular fa-calendar-days`} onClick={openCalendar}
              ></i>
            </div>
          </div>

          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="hernan.c@gmail.com"
            className="inputPrimary"
            name="email"
            value={createFormData.email}
            onChange={handleChangeCreate}
            required
          />

          <Input
            label="Teléfono"
            type="number"
            placeholder=""
            className="inputPrimary"
            name="phone"
            value={createFormData.phone}
            onChange={handleChangeCreate}
            required
          />

          <InputSelect
            label="País de nacimiento"
            className="inputPrimary"
            name="nationality"
            value={createFormData.nationality}
            onChange={handleChangeCreate}
            data={COUNTRIES}
          />

          <div style={{ display: "flex" }}>
            <Input
              label="Contraseña"
              type={!visible ? "password" : "text"}
              placeholder="**************"
              className="inputPrimary"
              name="password"
              value={createFormData.password}
              onChange={handleChangeCreate}
              required
            />
            <div className={`${styles.icon}`}>
              <i className={`fa-solid fa-eye`}
                onClick={() => setVisible(!visible)}
              ></i>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <Input
              label="Confirme Contraseña"
              type={!visible ? "password" : "text"}
              placeholder="**************"
              className="inputPrimary"
              name="confirmPassword"
              value={createFormData.confirmPassword}
              onChange={handleChangeCreate}
              required
            />
            <div className={`${styles.icon}`}>
              <i className={`fa-solid fa-eye`}
                onClick={() => setVisible(!visible)}
              ></i>
            </div>
          </div>




          <input type="checkbox" id="user-acept_terms" name="acceptedTerms" checked={createFormData.acceptedTerms} onChange={handleChangeCreate} /><span className={styles.spanStyle}>  Al continuar, aceptas los <Link onClick={() => setOpenModal(!openModal)}>Términos y Condiciones</Link></span>
          <Button className='btnRegister' text='Registrarse' type="submit" />


        </fieldset>
      </form>
    </>
  )
} 