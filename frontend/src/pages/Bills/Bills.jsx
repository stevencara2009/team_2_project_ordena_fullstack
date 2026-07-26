import { useEffect, useState } from 'react'
import { BillItem } from './BillItem/BillItem'
import { BillDetail } from './BillDetail/BillDetail'
import { BillModal } from './BillModal/BillModal'
import { useOrders } from '../../hooks/useOrders'
import { useAuth } from '../../hooks/useAuth'
import { useBills } from '../../hooks/useBills'
import { Input, InputSelect } from '../../components/Input/Input'

export const Bills = () => {
  const { user } = useAuth()
  const { orders, loadOrders, updateOrder } = useOrders()
  const { selectedBillDetails, loadBillDetails, addBill } = useBills()

  const [billingOrder, setBillingOrder] = useState(null)
  const [orderSearch, setOrderSearch] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [orderState, setOrderState] = useState("ENTREGADO")
  const [loading, setLoading] = useState(true)

  const ORDERS_STATE = ["ENTREGADO", "FACTURADO"]

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

  // Abre el modal de facturación para la orden seleccionada
  const handleOpenBillModal = (order) => {
    setBillingOrder(order)
  }

  // Confirma la factura desde el modal
  const handleConfirmBill = async ({ client_dni, payment_method }) => {
    try {
      const newBill = await addBill({
        order_id: billingOrder.id,
        cashier_id: user.id,
        client_dni,
        payment_method
      })

      await updateOrder(billingOrder.id, { state: 'FACTURADO' })
      await loadBillDetails(newBill.id)

      setBillingOrder(null)
    } catch (error) {
      alert(error.message || "No fue posible generar la factura")
    }
  }

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
          <h1>Facturar</h1>

          <div className="container-flex">
            <div className="module">
              <form>
                <fieldset className="form-flex">
                  <legend>Filtro</legend>

                  <Input
                    label="N° de orden"
                    type="number"
                    className="inputPrimary"
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
                    onChange={(e) => setOrderState(e.target.value)}
                    data={ORDERS_STATE}
                    variant='dark'
                  />
                </fieldset>
              </form>

              {loading
                ? <p>Cargando órdenes...</p>
                : <BillItem
                  ordersFiltered={ordersFiltered}
                  onCreateBill={handleOpenBillModal}
                />
              }
            </div>

            <div className="module">
              {selectedBillDetails
                ? <BillDetail billDetails={selectedBillDetails} />
                : <p><em>Genera una factura para ver su detalle aquí.</em></p>
              }
            </div>
          </div>
        </div>
      </div>

      <BillModal
        order={billingOrder}
        onClose={() => setBillingOrder(null)}
        onConfirm={handleConfirmBill}
      />
    </div>
  )
}