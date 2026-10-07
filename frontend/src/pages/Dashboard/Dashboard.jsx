import { CardOrder } from '../../components/Card/CardViewOrder'
import { TableEditModal } from '../../pages/Tables/TableEditModal'
import { Tables } from '../Tables/Tables'
import { useEffect, useState } from 'react'
import { useOrders } from '../../hooks/useOrders'
import { InputSelect } from '../../components/Input/Input'
import { ORDERS_STATE } from '../../data/options'
import { useTables } from '../../hooks/useTables'

export const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderState, setOrderState] = useState("Todos");
  const { tableOrders, loadOrdersByTable } = useOrders();
  const [openModal, setOpenModal] = useState(false);// Modal para Editar
  const [openModalUpdate, setOpenModalUpdate] = useState(false);// Modal para Editar
  const [editingId, setEditingId] = useState(null);
  // ESTADO FORMULARIO DETALLE / EDICIÓN (PATCH)
  const [formData, setFormData] = useState({
    id: "",
    number: "",
    capacity: "",
    state: "",
  }); // Formulario edición

  const { editTable } = useTables();

  // Escuchar cuando cambie la mesa seleccionada
  useEffect(() => {
    try {
      if (selectedTable) {
        loadOrdersByTable(selectedTable.number);
      }
      console.log(tableOrders);
      console.log(selectedTable)
    } catch (error) {
      console.error(error)
    }

  }, [selectedTable]);


  // Filtro por Estado de orden
  const ordersFiltered = (tableOrders || []).filter((order) => {

    const matchesState = 
      orderState === "Todos" ||
      order.state === orderState;

    return matchesState;

  });

  // HANDLER CAPTURAR DATOS
  const handleChangeCreate = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // HANDLERS PARA SELECCIONAR MESA
  const handleSelectTable = (table) => {
    setSelectedTable(table);

    setEditingId(table.number);

    setFormData({
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      state: table.state,
    });
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
      setOpenModalUpdate(false)
      alert("Mesa actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1>Dashboard</h1>
          <div className="container-flex">

            {/* Modulo mesas*/}
            <div className="module">
              <h2>Mesas</h2>
              <Tables 
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable} 
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleSelectTable={handleSelectTable} 
                setOpenModalUpdate={setOpenModalUpdate}/>
            </div>

            {/* Modulo pedidos asociados a mesa*/}
            <div className="module">
              <h2>Pedidos</h2>
              {/* Formulario filtro */}
              <form>
                <fieldset className="form-flex">
                  <legend>Filtro</legend>

                  <InputSelect
                    label="Estado"
                    className="inputPrimary"
                    value={orderState}
                    onChange={(e) =>
                      setOrderState(e.target.value)
                    }
                    data={ORDERS_STATE}
                  />

                </fieldset>
              </form>

              {ordersFiltered.length > 0 ? (
                ordersFiltered.map((order) => (
                  <CardOrder
                    key={order.id}
                    currentOrder={order}
                  />
                ))
              ) : (
                <p><em>No hay órdenes para esta mesa o no se ha seleccionado ninguna.</em></p>
              )}
              
            </div>

            {/* Modal Edición de Mesa (PATCH) */}
            <TableEditModal
              openModalUpdate={openModalUpdate}
              setOpenModalUpdate={setOpenModalUpdate}
              formData={formData}
              handleChangeEdit={handleChangeCreate}
              handleUpdate={handleUpdate}
              setFormData={setFormData}
              selectedTable={selectedTable}
            />


          </div>
        </div>
      </div>
    </div>
  )
}