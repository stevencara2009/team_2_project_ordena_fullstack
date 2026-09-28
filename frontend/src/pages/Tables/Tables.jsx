import styles from "./Tables.module.css";
import { useState, useEffect } from "react"; // 1. Importar useEffect
import { Input, InputSelect } from "../../components/Input/Input";
import { TableItem } from "./TableItem/TableItem";
import { useTables } from "../../hooks/useTables";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
import { TABLES_STATE } from "../../data/options";
import { useAuth } from "../../hooks/useAuth";
import { TableQR } from "../../components/TableQR/TableQR";
import { Pagination } from "../../components/Pagination/Pagination"; // 2. Importar Pagination

export const Tables = ({
  selectedTable,
  setSelectedTable,
  handleSelectTable,
  setOpenModal,
  openModal,
  setOpenModalUpdate,
}) => {
  const { tables, addTable, editTable, removeTable } = useTables();

  const [qrTable, setQrTable] = useState(null);

  const [tableSearch, setTableSearch] = useState("");
  const [tableState, setTableState] = useState("Todos");
  const [editingId, setEditingId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { user } = useAuth();

  // 3. ESTADOS Y CONFIGURACIÓN DE PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const tablesPerPage = 12;

  const [createFormData, setCreateFormData] = useState({
    number: "",
    capacity: "",
    state: "LIBRE",
  }); // Formulario creación

  // Filtro por mesa
  const tablesFiltered = tables.filter((table) => {
    const matchesSearch = table.number.toString().includes(tableSearch);
    const matchesState = tableState === "Todos" || table.state === tableState;

    return matchesSearch && matchesState;
  });

  // 4. RESETEAR A PÁGINA 1 AL FILTRAR
  useEffect(() => {
    setCurrentPage(1);
  }, [tableSearch, tableState]);

  // 5. LÓGICA DE PAGINACIÓN (SLICING)
  const totalPages = Math.ceil(tablesFiltered.length / tablesPerPage);
  const indexOfLastTable = currentPage * tablesPerPage;
  const indexOfFirstTable = indexOfLastTable - tablesPerPage;

  // Mesas correspondientes a la página activa
  const currentTables = tablesFiltered.slice(
    indexOfFirstTable,
    indexOfLastTable
  );

  // HANDLER CAPTURAR DATOS
  const handleChangeCreate = (e) => {
    const { name, value } = e.target;

    setCreateFormData((prev) => ({
      ...prev,
      [name]: value,
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
      await editTable(editingId, {
        capacity: Number(formData.capacity),
        state: formData.state,
      });
      setEditingId(null);
      setSelectedTable(null);
      alert("Mesa actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  // HANDLER UI POST - CREAR UNA MESA
  const handleCreate = async (e) => {
    e.preventDefault();
    if (createFormData.number === "" || createFormData.capacity === "") {
      alert("Hay campos vacíos");
      return;
    }
    try {
      await addTable({
        number: Number(createFormData.number),
        capacity: Number(createFormData.capacity),
        state: createFormData.state,
      });
      setCreateFormData({
        id: "",
        number: "",
        capacity: "",
        state: "",
      });
      setOpenModal(false);
      alert("Mesa creada");
    } catch (error) {
      console.log(error);
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
            variant="dark"
          />

          <InputSelect
            label="Estado"
            className="inputPrimary"
            value={tableState}
            onChange={(e) => setTableState(e.target.value)}
            data={TABLES_STATE}
            variant="dark"
          />
        </fieldset>
      </form>

      {user?.role === "ADMINISTRADOR" && (
        <Button
          text="+ Crear mesa"
          className="btnAdd"
          onClick={() => setOpenModal(true)}
        />
      )}

      {/* Modulo de Mesas */}
      <div className={styles.gridTables}>
        {/* 6. Pasamos solo la lista recortada a TableItem */}
        <TableItem
          tables={currentTables}
          onSelectTable={handleSelectTable}
          setOpenModalUpdate={setOpenModalUpdate}
          onShowQR={setQrTable}
        />
      </div>

      {/* 7. Componente de Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal crear una mesa */}
      <Modal isOpenModal={openModal} onCloseModal={() => setOpenModal(false)}>
        <div style={{ width: "100%", height: "100%" }}>
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

            <Button text="Crear" type="submit" className="btnAdd" />
          </form>
        </div>
      </Modal>

      {/* Modal QR de la mesa */}
      <Modal isOpenModal={!!qrTable} onCloseModal={() => setQrTable(null)}>
        {qrTable && <TableQR tableNumber={qrTable.number} />}
      </Modal>
    </div>
  );
};