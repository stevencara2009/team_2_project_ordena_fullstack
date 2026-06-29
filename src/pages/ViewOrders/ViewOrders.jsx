import { useEffect, useState } from 'react'
import { CardOrder } from '../../components/Card/CardViewOrder'
import { OrderItem } from './OrderItem/OrderItem'
import { useOrders } from '../../hooks/useOrders'
import { Input, InputSelect } from '../../components/Input/Input'
import { ORDERS_STATE } from '../../data/options'

export const ViewOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderSearch, setOrderSearch] = useState("");
  const [tableSearch, setOrderTable] = useState("");
  const [orderState, setOrderState] = useState("Todos");
  const [loading, setLoading] = useState(true)

  const { orders, loadOrders, updateOrder } = useOrders();

  const FILTERS_BY = ["Más reciente", "Más antiguos", "Mayor precio", "Menor precio"]

  const fetchOrders = async () => {
    try {
      setLoading(true);
      loadOrders();
    } catch (error) {
      console.error("Error cargando órdenes: ", error);
    } finally {
      setLoading(false)
    }
  };

  // Cargar todas las ordenes
  useEffect(() => {
    fetchOrders();
  }, []);


  // Avanzar estado de una orden
  const handleUpdateState = async (orderId, nextState) => {
    try {
      console.log(nextState)
      await updateOrder(orderId, { state: nextState })

      // Si la orden seleccionada es la que se actualizó, sincronizar
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, state: nextState }))
      }
    } catch (error) {
      console.error("Error actualizando estado:", error)
      alert("No fue posible actualizar el estado")
    }
  }

  
  const ordersFiltered = orders.filter(order => {
    const matchesSearchByOrder = order.id
      ? order.id.toString().includes(orderSearch)
      : false

    const matchesSearchByTable = order.table_number
      ? order.table_number.toString().includes(tableSearch)
      : false

    const matchesState =
      orderState === "Todos" || order.state === orderState

    return matchesSearchByOrder && matchesSearchByTable && matchesState
  })



  return (
    <div className="background">

      <div className="container">
        <div className='container-form'>
          <h1>Ver pedidos</h1>

          <div className="container-flex">

            {/* Modulo pedidos*/}
            <div className="module">

              {/* Formulario filtro */}
              <form>
                <fieldset className="form-flex">
                  <legend>Filtro</legend>

                  <Input
                    label="N° de orden"
                    type="number"
                    className="inputPrimary"
                    placeholder=""
                    name=""
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    variant='dark'
                  />

                  <Input
                    label="N° de mesa"
                    type="number"
                    className="inputPrimary"
                    placeholder=""
                    name=""
                    value={tableSearch}
                    onChange={(e) => setOrderTable(e.target.value)}
                    variant='dark'
                  />

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

              <OrderItem
                ordersFiltered={ordersFiltered}
                setSelectedOrder={setSelectedOrder}
                selectedOrder={selectedOrder}
                onUpdateState={handleUpdateState}
              />

            </div>

            {/* Modulo pedidos asociados a mesa*/}
            <div className="module">

              {selectedOrder ? (
                <CardOrder
                  key={selectedOrder.id}
                  currentOrder={selectedOrder}
                />
              ) : (
                <p><em>No hay órdenes o no se ha seleccionado ninguna.</em></p>
              )
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}