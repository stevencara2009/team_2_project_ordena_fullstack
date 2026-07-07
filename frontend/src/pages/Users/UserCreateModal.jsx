import styles from './Users.module.css'
import { Input, InputSelect } from '../../components/Input/Input'
import { USERS_TYPE, DOCUMENTS_TYPE, COUNTRIES } from "../../data/options.js"
import { uploadUserImage } from '../../services/userService.js'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { useEffect, useRef, useState } from 'react'


export const UserCreateModal = ({
  openModal,
  setOpenModal,
  createFormData,
  handleChangeCreate,
  handleCreate,
  setCreateFormData
}) => {

  const [visible, setVisible] = useState(false)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  // ABRIR CALENDARIO CON CLICK EN ICONO
  const dataRef = useRef(null)
  const openCalendar = () => { dataRef.current.showPicker() }

  
  // Si se cierra el modal entonces se reinicia el preview de la imagen
  useEffect(() => {
    if (!openModal) {
      setPreview(null)
      setUploadError(null)
    }
  }, [openModal])

  useEffect(() => {
    if (submitted) {
      setPreview(null)
      setUploadError(null)
      setSubmitted(false)
    }
  }, [submitted])


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
      handleChangeCreate({ target: { name: 'image', value: imageUrl } })
    } catch (error) {
      setUploadError('Error al subir la imagen. Intenta de nuevo.')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }


  const handleClear = () => {
    setCreateFormData({
      name: "",
      lastname: "",
      dni: "",
      typeDocument: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      nationality: "",
      image: "",
      active: true,
      birthdate: "",
    })
    setPreview(null)
    setUploadError(null)
  }

  const handleSubmitCreate = (e) => {
    handleCreate(e) 
    setSubmitted(true)
  }

  return (
    <Modal isOpenModal={openModal} onCloseModal={() => setOpenModal(false)} onAccept={() => { }} >
      <div style={{ width: "100%", height: "100%", }}>
        <h2 style={{ color: "black" }}>Crear usuario</h2>
        <form onSubmit={handleSubmitCreate}>
          <fieldset>
            <legend>Detalle del Usuario</legend>
            <div className={styles.displayForm} style={{ color: "black" }} >
              <Input
                label="Nombres"
                type="text"
                placeholder=""
                className="labelDark"
                name="name"
                value={createFormData.name}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />

              <Input
                label="Apellidos"
                type="text"
                placeholder=""
                className="labelDark"
                name="lastname"
                value={createFormData.lastname}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />

              <InputSelect
                label="Tipo de documento"
                className="labelDark"
                name="typeDocument"
                value={createFormData.typeDocument}
                onChange={handleChangeCreate}
                data={DOCUMENTS_TYPE}
                variant="Light"
              />

              <Input
                label="N° de documento"
                type="text"
                placeholder=""
                className="labelDark"
                name="dni"
                value={createFormData.dni}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />


              <div style={{ display: "flex" }}>
                <Input
                  ref={dataRef}
                  label="Fecha de Nacimiento"
                  type="date"
                  className="labelDark"
                  name="birthdate"
                  value={createFormData.birthdate}
                  min="1936-04-26"
                  max="2008-04-26"
                  onChange={handleChangeCreate}
                  required
                  variant="Light"
                />
                <i className={`fa-regular fa-calendar-days ${styles.icon}`} onClick={openCalendar}
                ></i>
              </div>

              <Input
                label="Correo Electrónico"
                type="email"
                placeholder=""
                className="labelDark"
                name="email"
                value={createFormData.email}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />

              <Input
                label="Teléfono"
                type="number"
                placeholder=""
                className="labelDark"
                name="phone"
                value={createFormData.phone}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />

              <InputSelect
                label="País de nacimiento"
                className="labelDark"
                name="nationality"
                value={createFormData.nationality}
                onChange={handleChangeCreate}
                data={COUNTRIES}
                variant="Light"
              />

              <InputSelect
                label="Tipo de usuario"
                className="labelDark"
                name="role"
                value={createFormData.role}
                onChange={handleChangeCreate}
                data={USERS_TYPE}
                variant="Light"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: "bold" }}>Imagen del producto (opcional)</label>

                {preview && (
                  <img
                    src={preview}
                    alt="Vista previa"
                    style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  disabled={uploading}
                  style={{ cursor: 'pointer', fontSize: '9px' }}
                />

                {uploading && <span style={{ color: '#888', fontSize: '0.85rem' }}>Subiendo imagen…</span>}
                {uploadError && <span style={{ color: 'red', fontSize: '0.85rem' }}>{uploadError}</span>}


                <Input
                  label="…o pega una URL"
                  type="text"
                  name="image"
                  placeholder="https://..."
                  value={createFormData.image}
                  onChange={handleChangeCreate}
                  variant="Light"
                />
              </div>



              <div style={{ display: "flex" }}>
                <Input
                  label="Contraseña"
                  type={!visible ? "password" : "text"}
                  placeholder=""
                  className="labelDark"
                  name="password"
                  value={createFormData.password}
                  onChange={handleChangeCreate}
                  required
                  variant="Light"
                />
                <i className={`fa-solid fa-eye ${styles.icon}`}
                  onClick={() => setVisible(!visible)}
                ></i>
              </div>

              <Input
                label="Confirme Contraseña"
                type={!visible ? "password" : "text"}
                placeholder=""
                className="labelDark"
                name="confirmPassword"
                value={createFormData.confirmPassword}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />

              <div className={styles.divActionsOrder}>
                <Button text='Borrar' className='btnDelete' onClick={handleClear} />
                <Button text='Añadir' className='btnAdd' type='submit' />
              </div>

            </div>

          </fieldset>
        </form>
      </div>
    </Modal>

  )
} 