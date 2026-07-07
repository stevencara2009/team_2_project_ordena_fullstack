import styles from './Products.module.css'
import { Input, InputSelect } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { PLATES_TYPE } from '../../data/options'
import { uploadProductImage } from '../../services/productService'
import { useEffect, useState } from 'react'
import logo from '../../assets/without_photo_profile.jpg'

export const ProductEditForm = ({
  formData,
  handleChangeEdit,
  handleUpdate,
  setOpenDeleteModal
}) => {


  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

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
  }, [formData?.id])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Vista previa local inmediata sin esperar a Cloudinary
    setPreview(URL.createObjectURL(file))
    setUploadError(null)
    setUploading(true)

    try {
      const { imageUrl } = await uploadProductImage(file)
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
      <h2>Editar Producto</h2>
      {formData?.id !== "" ? (
        <form onSubmit={handleSubmitEdit}>
          <fieldset>
            <legend>Detalle del Producto</legend>
            <div className={styles.displayForm}>
              <Input
                label="Nombre"
                type="text"
                className="inputPrimary"
                placeholder=""
                name="name"
                value={formData?.name || ""}
                onChange={handleChangeEdit}
                required
              />

              <InputSelect
                label="Tipo de comida"
                className="inputPrimary"
                name="category"
                value={formData?.category || ""}
                onChange={handleChangeEdit}
                data={PLATES_TYPE}
              />

              <Input
                label="Precio"
                type="number"
                className="inputPrimary"
                placeholder=""
                name="price"
                value={formData?.price || ""}
                onChange={handleChangeEdit}
                required
              />

              <Input
                label="Descripción (opcional)"
                type="text"
                className="inputPrimary"
                placeholder="Añada una descripción del producto..."
                name="description"
                value={formData?.description || ""}
                onChange={handleChangeEdit}
                required
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
                    }}
                  />
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
                  value={formData?.image || ""}
                  onChange={handleChangeEdit}
                />
              </div>

              <div className={styles.divActionsOrder}>
                <Button
                  type="button" // <-- Corregido para que no haga submit del form al presionar eliminar
                  className='btnDelete'
                  text='Eliminar'
                  onClick={() => {
                    if (formData?.id) setOpenDeleteModal(true)
                  }}
                />
                <Button className='btnAdd' text='Actualizar' type='submit' />
              </div>

            </div>
          </fieldset>
        </form>
      ) : (
        <p><em>Selecciona un producto para empezar a editar</em></p>
      )}
    </>
  )
} 