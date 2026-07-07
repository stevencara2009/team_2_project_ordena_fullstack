import styles from './Users.module.css'
import { Input, InputSelect } from '../../components/Input/Input'
import { USERS_TYPE, DOCUMENTS_TYPE, COUNTRIES } from "../../data/options.js"
import { uploadUserImage } from '../../services/userService.js'
import { Button } from '../../components/Button/Button'
import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/without_photo_profile.jpg'

export const UserEditForm = ({
  formData,
  handleChangeEdit,
  handleUpdate,
  setOpenDeleteModal
}) => {


  const [visible, setVisible] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [submitted, setSubmitted] = useState(false)


  // ABRIR CALENDARIO CON CLICK EN ICONO
  const dataRef = useRef(null)
  const openCalendar = () => { dataRef.current.showPicker() }

  // Si se envía el form se reinicia el preview de la imagen
  useEffect(() => {
    if (submitted) {
      setPreview(null)
      setUploadError(null)
      setSubmitted(false)
    }
  }, [submitted])

  useEffect(() => {
    setPreview(null)
    console.log(formData.id)
  }, [formData.id])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Vista previa local inmediata sin esperar a Cloudinary
    setPreview(URL.createObjectURL(file))
    setUploadError(null)
    setUploading(true)

    try {
      const { imageUrl } = await uploadUserImage(file)
      // Inyecta la URL de Cloudinary en createFormData.image
      handleChangeEdit({ target: { name: 'image', value: imageUrl } })
    } catch (error) {
      setUploadError('Error al subir la imagen. Intenta de nuevo.')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmitEdit = async (e) => {
    const success = await handleUpdate(e)
    if (success) setSubmitted(true)
  }



  return (
    <>
      <h2>Editar usuario</h2>
      {formData.id !== "" ? (
        <form onSubmit={handleSubmitEdit}>
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: "white", fontSize: '12px' }}>Imagen del producto (opcional)</label>

                {preview ? (
                  <img
                    src={preview}
                    alt="Vista previa"
                    style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <img
                    src={formData?.image && formData.image.trim() !== "" ? formData.image : logo}
                    alt="Foto de perfil"
                    style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = logo;
                    }} />
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  disabled={uploading}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                />

                {uploading && <span style={{ color: '#888', fontSize: '0.85rem' }}>Subiendo imagen…</span>}
                {uploadError && <span style={{ color: 'red', fontSize: '0.85rem' }}>{uploadError}</span>}


                <Input
                  label="…o pega una URL"
                  type="text"
                  className="inputPrimary"
                  name="image"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleChangeEdit}
                />

              </div>


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