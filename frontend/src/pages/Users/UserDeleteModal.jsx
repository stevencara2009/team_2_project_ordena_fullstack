import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'

export const UserDeleteModal = ({ openDeleteModal, setOpenDeleteModal, formData, handleDelete }) => {

  return (
    <Modal
      isOpenModal={openDeleteModal}
      onCloseModal={() => setOpenDeleteModal(false)}
    >
      <h2 style={{ color: 'black' }}>Eliminar usuario</h2>
      <p style={{ color: 'black' }}>¿Estás seguro que deseas eliminar este usuario "{formData.name}" "{formData.lastname}" ?</p>

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