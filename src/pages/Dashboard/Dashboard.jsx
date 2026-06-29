import { CardOrder } from '../../components/Card/CardViewOrder'
import { Tables } from '../Tables/Tables'
import { useEffect, useState } from 'react'
import { useOrders } from '../../hooks/useOrders'
import { InputSelect } from '../../components/Input/Input'
import { ORDERS_STATE } from '../../data/options'

export const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderState, setOrderState] = useState("Todos");
  const { tableOrders, loadOrdersByTable } = useOrders();

  // Escuchar cuando cambie la mesa seleccionada
  useEffect(() => {
    try {
      if (selectedTable) {
        loadOrdersByTable(selectedTable.number);
      }
      console.log(tableOrders);
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

  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1>Dashboard</h1>
          <div className="container-flex">

            {/* Modulo mesas*/}
            <div className="module">
              <h2>Mesas</h2>
              <Tables selectedTable={selectedTable}
                setSelectedTable={setSelectedTable} />
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
                    variant='dark'
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

          </div>
        </div>
      </div>
    </div>
  )
}