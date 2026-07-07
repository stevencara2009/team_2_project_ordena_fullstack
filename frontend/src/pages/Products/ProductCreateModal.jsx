import styles from './Products.module.css'
import { Input, InputSelect } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { PLATES_TYPE } from '../../data/options'
import { uploadProductImage } from '../../services/productService'
import { useEffect, useState } from 'react'

export const ProductCreateModal = ({
  openModal,
  setOpenModal,
  createFormData,
  handleChangeCreate,
  handleCreate,
  setCreateFormData
}) => {

  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

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
      const { imageUrl } = await uploadProductImage(file)
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
    setCreateFormData({ name: '', category: '', price: 0, description: '', image: '' })
    setPreview(null)
    setUploadError(null)
  }

  const handleSubmitCreate = async (e) => {
    const success = await handleCreate(e)
    if (success)  setSubmitted(true)
  }

  return (
    <Modal isOpenModal={openModal} onCloseModal={() => setOpenModal(false)} onAccept={() => { }} >
      <div style={{ width: "100%", height: "100%", }}>
        <h2 style={{ color: "black" }}>Crear producto</h2>
        <form onSubmit={handleSubmitCreate}>
          <fieldset>
            <legend>Detalle del Producto</legend>
            <div className={styles.displayForm} style={{ color: "black" }}>
              <Input
                label="Nombre"
                type="text"
                className=""
                placeholder=""
                name="name"
                value={createFormData.name}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />

              <InputSelect
                label="Tipo de comida"
                className="labelDark"
                name="category"
                value={createFormData.category}
                onChange={handleChangeCreate}
                data={PLATES_TYPE}
                variant="Light"
              />

              <Input
                label="Precio"
                type="number"
                className="labelDark"
                placeholder=""
                name="price"
                value={createFormData.price}
                onChange={handleChangeCreate}
                required
                variant="Light"
              />

              <Input
                label="Descripción (opcional)"
                type="text"
                className="labelDark"
                placeholder="Añada una descripción del producto..."
                name="description"
                value={createFormData.description}
                onChange={handleChangeCreate}
                required
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



              <div className={styles.divActionsOrder}>
                <Button className='btnDelete' text='Borrar' onClick={handleClear} />
                <Button className='btnAdd' text='Añadir' type='submit' disabled={uploading} />
              </div>

            </div>
          </fieldset>
        </form>
      </div>
    </Modal>
  )
} 