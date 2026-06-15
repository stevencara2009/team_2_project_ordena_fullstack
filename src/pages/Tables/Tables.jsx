import styles from './Tables.module.css'
import { useState, useEffect } from 'react';
import { Input, InputSelect } from '../../components/Input/Input';
import { TableItem } from './TableItem/TableItem';
import { useTables } from "../../hooks/useTables";
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button'
import { FILTERS_BY, TABLES_STATE } from '../../data/options';
import { Products } from '../Products/Products'
import { Users } from '../Users/Users'
import { ViewOrders } from '../ViewOrders/ViewOrders'
import { Register } from '../Register/Register'
import { Orders } from '../Orders/Orders'
import { Index } from '../Index/Index'

export const Tables = ({ selectedTable, setSelectedTable }) => {

  const {
    tables,
    addTable,
    editTable,
    removeTable
  } = useTables();

  const [tableSearch, setTableSearch] = useState("");
  const [tableState, setTableState] = useState("Todos");
  const [editingId, setEditingId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    number: "",
    capacity: "",
    state: ""
  });   // Formulario edición
  const [createFormData, setCreateFormData] = useState({
    number: "",
    capacity: "",
    state: "LIBRE"
  });   // Formulario creación


  // Filtro por mesa
  const tablesFiltered = tables.filter((table) => {

    const matchesSearch =
      table.number
        .toString()
        .includes(tableSearch);

    const matchesState =
      tableState === "Todos" ||
      table.state === tableState;

    return matchesSearch && matchesState;

  });

  // HANDLERS PARA SELECCIONAR MESA
  const handleSelectTable = (table) => {

    setSelectedTable(table);

    setEditingId(table.number);

    setFormData({
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      state: table.state
    });

  };

  // HANDLERS PARA EDITAR MESA
  const handleChangeEdit = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };


  // HANDLER CAPTURAR DATOS
  const handleChangeCreate = (e) => {

    const { name, value } = e.target;

    setCreateFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };


  // HANDLER UI PATCH - ACTUALIZAR UNA MESA
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.state) {
      alert("Por favor, seleccione un estado válido.");
      return;
    }

    try {
      await editTable(
        editingId,
        {
          capacity: Number(formData.capacity),
          state: formData.state
        })
      setEditingId(null);
      setSelectedTable(null);
      alert("Mesa actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };


  // HANDLER DELETE - ELIMINAR UNA MESA
  const handleDelete = async () => {

    try {
      await removeTable(formData.id);
      setEditingId(null);
      setSelectedTable(null);

      setFormData({
        id: "",
        number: "",
        capacity: "",
        state: ""
      })
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }

  };


  // HANDLER UI POST - CREAR UNA MESA
  const handleCreate = async (e) => {
    e.preventDefault();
    if (createFormData.number === "" || createFormData.capacity === "") {
      alert("Hay campos vacíos")
      return
    }
    try {
      await addTable({
        number: Number(createFormData.number),
        capacity: Number(createFormData.capacity),
        state: createFormData.state
      });
      setCreateFormData({
        id: "",
        number: "",
        capacity: "",
        state: ""
      })
      setOpenModal(false);
      alert("Mesa creada")
    } catch (error) {
      console.log(error)
    }

  };



  return (
    <div>
      {/* Formulario filtro */}
      <form>
        <fieldset className="form-flex">
          <legend>Filtro</legend>

          <Input
            label="N° de mesa"
            type="number"
            className="inputPrimary"
            placeholder=""
            name=""
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            variant='dark'
          />

          <InputSelect
            label="Estado"
            className="inputPrimary"
            value={tableState}
            onChange={(e) =>
              setTableState(e.target.value)
            }
            data={TABLES_STATE}
            variant='dark'
          />

        </fieldset>
      </form>


      <Button
        text="+ Crear mesa"
        className="btnAdd"
        onClick={() => setOpenModal(true)}
      />

      {/* Modulo de Mesas */}
      <div className={styles.gridTables}>
        <TableItem
          tables={tablesFiltered}
          onSelectTable={handleSelectTable}
        />
      </div>


      {/* Formulario actualizar / eliminar mesa */}
      {editingId && (

        <form onSubmit={handleUpdate}>

          <fieldset>

            <legend>Detalle Mesa</legend>

            <Input
              label="Número"
              name="number"
              type="number"
              value={formData.number}
              onChange={handleChangeEdit}
              className="inputPrimary"
            />

            <Input
              label="Capacidad"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChangeEdit}
              className="inputPrimary"
            />

            <InputSelect
              label="Estado"
              name="state"
              value={formData.state}
              onChange={handleChangeEdit}
              data={TABLES_STATE.filter(
                state => state !== "Todos"
              )}
              className="inputPrimary"
            />

            <Button
              text="Actualizar"
              className="btnAdd"
              type="submit"
            />

            <Button
              text="Eliminar"
              className="btnDelete"
              type="button"
              onClick={() =>
                setOpenDeleteModal(true)
              }
            />

          </fieldset>

        </form>

      )}


      {/* Modal crear una mesa */}
      <Modal
        isOpenModal={openModal}
        onCloseModal={() => setOpenModal(false)}
      >

        <div style={{ width: "100%", height: "100%", }}>
          <h2 style={{ color: "black" }}>Crear Mesa</h2>
          <form onSubmit={handleCreate}>
            <Input
              label="Número"
              name="number"
              type="number"
              value={createFormData.number}
              onChange={handleChangeCreate}
              variant="Light"
              required
            />

            <Input
              label="Capacidad"
              name="capacity"
              type="number"
              value={createFormData.capacity}
              onChange={handleChangeCreate}
              variant="Light"
              required
            />

            <Button
              text="Crear"
              type="submit"
              className="btnAdd"
            />

          </form>
        </div>
      </Modal>


      {/* Modal eliminar mesa */}
      <Modal
        isOpenModal={openDeleteModal}
        onCloseModal={() =>
          setOpenDeleteModal(false)
        }
      >

        <h2 style={{ color: "black" }}>
          Eliminar Mesa
        </h2>

        <Button
          text="Aceptar"
          onClick={handleDelete}
        />

      </Modal>


      {/* {orders.map((order) => (
        <CardOrder orders={orders} key={order.id} />
      ))} */}

    </div>
  )
}