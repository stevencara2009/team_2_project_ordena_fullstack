import styles from './Users.module.css'
import { Input, InputSelect } from '../../components/Input/Input'
import { USERS_TYPE, DOCUMENTS_TYPE, COUNTRIES } from "../../data/options.js"
import { Button } from '../../components/Button/Button'
import { useRef, useState } from 'react'


export const UserEditForm = ({ formData, handleChangeEdit, handleUpdate, setOpenDeleteModal }) => {

  const [visible, setVisible] = useState(false)
  // ABRIR CALENDARIO CON CLICK EN ICONO
  const dataRef = useRef(null)
  const openCalendar = () => { dataRef.current.showPicker() }

  return (
    <>
      <h2>Editar usuario</h2>
      {formData.id !== "" ? (
        <form onSubmit={handleUpdate}>
          <fieldset>
            <legend>Detalle de usuario</legend>

            <div className={styles.displayForm}>
              <Input
                label="Nombres"
                type="text"
                placeholder=""
                className="inputPrimary"
                name="name"
                value={formData.name}
                onChange={handleChangeEdit}
                required
              />

              <Input
                label="Apellidos"
                type="text"
                placeholder=""
                className="inputPrimary"
                name="lastname"
                value={formData.lastname}
                onChange={handleChangeEdit}
                required
              />

              <InputSelect
                label="Tipo de documento"
                className="inputPrimary"
                name="typeDocument"
                value={formData.typeDocument}
                onChange={handleChangeEdit}
                data={DOCUMENTS_TYPE}
              />

              <Input
                label="N° de documento"
                type="text"
                placeholder=""
                className="inputPrimary"
                name="dni"
                value={formData.dni}
                onChange={handleChangeEdit}
                required
              />


              <div style={{ display: "flex" }}>
                <Input
                  ref={dataRef}
                  label="Fecha de Nacimiento"
                  type="date"
                  className="inputPrimary"
                  name="birthdate"
                  value={formData.birthdate}
                  min="1936-04-26"
                  max="2008-04-26"
                  onChange={handleChangeEdit}
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
                onChange={handleChangeEdit}
                required
              />

              <Input
                label="Teléfono"
                type="number"
                placeholder=""
                className="inputPrimary"
                name="phone"
                value={formData.phone}
                onChange={handleChangeEdit}
                required
              />

              <InputSelect
                label="País de nacimiento"
                className="inputPrimary"
                name="nationality"
                value={formData.nationality}
                onChange={handleChangeEdit}
                data={COUNTRIES}
              />

              <InputSelect
                label="Tipo de usuario"
                className="inputPrimary"
                name="role"
                value={formData.role}
                onChange={handleChangeEdit}
                data={USERS_TYPE}
              />

              <Input
                label="Imágen de perfil (opcional)"
                type="text"
                className="inputPrimary"
                placeholder="Subir URL foto"
                name="image"
                value={formData.image}
                onChange={handleChangeEdit}
                required
              />


              <div style={{ display: "flex" }}>
                <Input
                  label="Cambiar contraseña"
                  type={!visible ? "password" : "text"}
                  placeholder=""
                  className="inputPrimary"
                  name="password"
                  value={formData.password}
                  onChange={handleChangeEdit}
                  required
                />
                <i className={`fa-solid fa-eye ${styles.icon}`}
                  onClick={() => setVisible(!visible)}
                ></i>
              </div>

              <Input
                label="Confirme Contraseña"
                type={!visible ? "password" : "text"}
                placeholder=""
                className="inputPrimary"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChangeEdit}
                required
              />

              <div className={styles.divActionsOrder}>
                <Button text='Eliminar' className='btnDelete' onClick={() => {
                  if (formData.id) setOpenDeleteModal(true)
                }} />
                <Button text='Actualizar' className='btnAdd' type='submit' />
              </div>

            </div>

          </fieldset>
        </form>
      )
        : <p><em>Selecciona un usuario para empezar a editar</em></p>
      }


    </>
  )
} 