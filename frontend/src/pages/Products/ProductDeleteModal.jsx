import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'

export const ProductDeleteModal = ({ openDeleteModal, setOpenDeleteModal, formData, handleDelete }) => {

  return (
    <Modal
      isOpenModal={openDeleteModal}
      onCloseModal={() => setOpenDeleteModal(false)}
    >
      <h2 style={{ color: 'black' }}>Eliminar producto</h2>
      <p style={{ color: 'black' }}>¿Estás seguro que deseas eliminar este producto "{formData.name}" ?</p>

      <Button
        text="Aceptar"
        onClick={handleDelete}
        className='btnDelete'
        type="button"
      />

      <Button
        text="Cancelar"
        onClick={() => setOpenDeleteModal(false)}
        className='btnBack'
        type="button"
      />
    </Modal>

  )
} 