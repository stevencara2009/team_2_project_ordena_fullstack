import { useEffect, useState } from 'react'
import { BillItem } from './BillItem/BillItem'
import { BillDetail } from './BillDetail/BillDetail'
import { useOrders } from '../../hooks/useOrders'
import { useAuth } from '../../hooks/useAuth'
import { useBills } from '../../hooks/useBills'
import { Input, InputSelect } from '../../components/Input/Input'

export const Bills = () => {
  const { user } = useAuth()

  // Órdenes entregadas pendientes de facturar
  const { orders, loadOrders, updateOrder } = useOrders()

  // Facturas ya generadas
  const { selectedBillDetails, loadBillDetails, addBill } = useBills()

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderSearch, setOrderSearch] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [orderState, setOrderState] = useState("ENTREGADO");
  const [loading, setLoading] = useState(true)

  const ORDERS_STATE = [
    "ENTREGADO",
    "FACTURADO"
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        await loadOrders()
      } catch (error) {
        console.error("Error cargando órdenes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])



  useEffect(() => {
    console.log(selectedBillDetails)
  }, [selectedBillDetails])

  // Generar factura para una orden
  const handleCreateBill = async (order) => {
    const confirmar = window.confirm(
      `¿Generar factura para el pedido #${order.id}?`
    )
    if (!confirmar) return

    try {
      // 1. Crear la factura
      const newBill = await addBill({
        order_id: order.id,
        user_id: user.id,
        client_id: order.client_id ?? 1
      })

      // 2. Cambiar estado de la orden a FACTURADO
      await updateOrder(order.id, { state: 'FACTURADO' })

      // 3. Cargar el detalle de la factura recién creada para mostrarlo
      await loadBillDetails(newBill.id)

      // 4. Deseleccionar la orden (ya no aparece en la lista)
      setSelectedOrder(null)

    } catch (error) {
      console.error("Error generando factura:", error)
      alert("No fue posible generar la factura")
    }
  }

  // Solo mostrar órdenes ENTREGADAS (pendientes de facturar)
  const ordersFiltered = orders.filter(order => {
    const matchesOrder = order.id
      ? order.id.toString().includes(orderSearch)
      : false

    const matchesTable = order.table_number
      ? order.table_number.toString().includes(tableSearch)
      : false

    const matchesState =
      orderState === "Todos" || order.state === orderState
      
    return matchesOrder && matchesTable && matchesState
  })

  return (
    <div className="background">
      <div className="container">
        <div className='container-form'>
          <h1>Facturas</h1>

          <div className="container-flex">

            {/* Módulo izquierdo — órdenes listas para facturar */}
            <div className="module">
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
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
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

              {loading
                ? <p>Cargando órdenes...</p>
                : <BillItem
                  ordersFiltered={ordersFiltered}
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
                  onCreateBill={handleCreateBill}
                />
              }
            </div>

            {/* Módulo derecho — detalle de la factura generada */}
            <div className="module">
              {selectedBillDetails
                ? <BillDetail billDetails={selectedBillDetails} />
                : <p><em>Genera una factura para ver su detalle aquí.</em></p>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}