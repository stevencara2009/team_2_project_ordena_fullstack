import { Input, InputSelect } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { TABLES_STATE } from "../../data/options";
import { Modal } from "../../components/Modal/Modal";

export const TableEditModal = ({
  openModalUpdate,
  setOpenModalUpdate,
  formData,
  handleChangeEdit,
  handleUpdate,
}) => {

  return (
    <Modal
      isOpenModal={openModalUpdate}
      onCloseModal={() => setOpenModalUpdate(false)}
      onAccept={() => {}}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <h2 style={{ color: "black" }}>Editar Mesa</h2>

        {formData?.id !== "" && (
          <form onSubmit={handleUpdate}>
            <fieldset>
              <legend>Detalle Mesa</legend>

              <Input
                label="Número"
                name="number"
                type="number"
                value={formData.number}
                onChange={handleChangeEdit}
                className="labelDark"
                disabled={true}
              />

              <Input
                label="Capacidad"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChangeEdit}
                className="labelDark"
              />

              <InputSelect
                label="Estado"
                name="state"
                value={formData.state}
                onChange={handleChangeEdit}
                data={TABLES_STATE.slice(1)}
                className="labelDark"
              />

              <Button text="Actualizar" className="btnAdd" type="submit" />

              {/*
                  <Button
                    text="Eliminar"
                    className="btnDelete"
                    type="button"
                    onClick={() => setOpenDeleteModal(true)}
                  />
                  */}
            </fieldset>
          </form>
        )}
      </div>
    </Modal>
  );
};
