import styles from './Orders.module.css'
import { CardOrder } from '../../components/Card/CardCreateOrder'
import { Button } from '../../components/Button/Button'
import { Input, InputSelect } from '../../components/Input/Input'
import { useState } from 'react'
import { Loader } from '../../components/Loader/Loader'
import { PLATES_TYPE } from '../../data/options'
import { useAuth } from '../../hooks/useAuth'
import { useOrders } from '../../hooks/useOrders'
import { useProducts } from '../../hooks/useProducts'
import { useTables } from '../../hooks/useTables'
import { useOrderProducts } from '../../hooks/useOrderProducts'

export const Orders = () => {
  const { user } = useAuth()

  const { currentOrder, createOrder, updateOrder, clearOrder } = useOrders()
  const { products: apiProducts } = useProducts()
  const { tables } = useTables()
  const { orderDetails, loadOrderDetails, addProduct, deleteProduct, clearOrderDetails, deleteAllProducts } = useOrderProducts();

  const [loading, setLoading] = useState(false)
  const [table, setTable] = useState("")
  const [formData, setFormData] = useState({
    category: "",
    productId: "",
    quantity: 1,
    notes: "",
  })

  const filteredProducts = apiProducts.filter(
    product => product.category === formData.category
  )

  // Capturar cambios del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Crear la orden
  const handleCreateOrder = async () => {
    if (!table) {
      alert("Seleccione una mesa")
      return
    }

    setLoading(true)
    try {
      const payload = {
        table_number: Number(table),
        client_id: 1,
        user_id: user.id
      }

      const orderCreated = await createOrder(payload)
      await loadOrderDetails(orderCreated.id)
      alert(`Pedido #${orderCreated.id} creado`)

    } catch (error) {
      console.error(error)
      alert("No fue posible crear el pedido")
    } finally {
      setLoading(false)
    }
  }


  // Agregar producto a la orden existente
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentOrder) {
      alert("Primero debe crear el pedido")
      return
    }

    if (!formData.productId) {
      alert("Seleccione un platillo")
      return
    }

    setLoading(true)

    try {
      await addProduct({
        order_id: currentOrder.id,
        product_id: Number(formData.productId),
        quantity: Number(formData.quantity),
        notes: formData.notes || null
      })

      // Refrescar el detalle de la orden tras agregar
      await loadOrderDetails(currentOrder.id)

      // Limpiar solo los campos de producto, no la categoría
      setFormData({ category: "", productId: "", quantity: 1, notes: "" })

    } catch (error) {
      console.error(error)
      alert("No fue posible agregar el producto")
    } finally {
      setLoading(false)
    }

  }

  // Agregar producto a la orden existente
  const handleConfirmOrder = async () => {
    if (!currentOrder) return

    if (orderDetails.length === 0) {
      alert("Agregue al menos un producto antes de confirmar")
      return
    }

    setLoading(true)
    try {
      await updateOrder(currentOrder.id, { state: 'EN PREPARACION' })
      alert(`Pedido #${currentOrder.id} enviado a cocina`)

      // Limpiar el formulario para un nuevo pedido
      clearOrder()
      if (clearOrderDetails) clearOrderDetails()
      setTable("")
      setFormData({ category: "", productId: "", quantity: 1, notes: "" })
    } catch (error) {
      console.error(error)
      alert("No fue posible confirmar el pedido")
    } finally {
      setLoading(false)
    }
  }

  // Eliminar producto de la orden
  const handleDeleteProduct = async (productId) => {
    if (!currentOrder) return

    setLoading(true)
    try {
      await deleteProduct(currentOrder.id, productId)
      await loadOrderDetails(currentOrder.id)
    } catch (error) {
      console.error(error)
      alert("No fue posible eliminar el producto")
    } finally {
      setLoading(false)
    }
  }

  // Cancelar / eliminar pedido completo
  const handleCancelOrder = async () => {
    if (!currentOrder) return

    const confirmar = window.confirm(
      `¿Eliminar el pedido #${currentOrder.id} y todos sus productos?`
    )
    if (!confirmar) return

    setLoading(true)
    try {
      // 1. Eliminar productos de la orden
      await deleteAllProducts(currentOrder.id)

      // 2. Eliminar la orden
      await fetch(`${import.meta.env.VITE_API_URL}/orders/${currentOrder.id}`, {
        method: 'DELETE'
      })

      // 3. Limpiar estado
      clearOrder()
      if (clearOrderDetails) clearOrderDetails()

      setTable("")
      setFormData({ category: "", productId: "", quantity: 1, notes: "" })

    } catch (error) {
      console.error(error)
      alert("No fue posible eliminar el pedido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1>Creá un pedido</h1>

          <div className="container-flex">
            <div className="module">

              {/* SELECCIÓN DE MESA Y CREACIÓN DE ORDEN */}
              <div >
                  <InputSelect
                    label="Mesa"
                    className="inputPrimary"
                    placeholder=""
                    name="table"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                    data={tables
                      .filter(table => table.state === 'LIBRE')
                      .map(table => ({
                        value: table.number,
                        label: `Mesa ${table.number} (${table.capacity} personas)`
                      }))
                    }
                    variant='dark'
                    disabled={currentOrder?.id }
                    required
                  />

                  <Button
                    text={currentOrder?.id ? `Pedido #${currentOrder.id} activo` : "Crear pedido"}
                    className="btnPrimary"
                    type="button"
                    onClick={handleCreateOrder}
                    disabled={currentOrder?.id }
                  />
              </div>

              {/* FORMULARIO PARA AGREGAR PRODUCTOS */}
              <form onSubmit={handleSubmit} >
                <fieldset>
                  <h2>Añadí a tu pedido</h2>
                  <div className={styles.displayForm}>

                    <InputSelect
                      label="Tipo de comida"
                      className="inputPrimary"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      data={PLATES_TYPE}
                    />

                    <InputSelect
                      label="Platillo"
                      className="inputPrimary"
                      name="productId"
                      value={formData.productId}
                      onChange={handleChange}
                      variant='dark'
                      data={filteredProducts.map(product => ({
                        value: product.id,
                        label: product.name
                      }))}
                    />

                    <Input
                      label="Cantidad"
                      type="number"
                      min="1"
                      max="30"
                      className="inputPrimary"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      variant='dark'
                    />

                    <Input
                      label="Observación (opcional)"
                      type="text"
                      className="inputPrimary"
                      placeholder="Ingrese alguna nota relevante..."
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      variant='dark'
                    />


                    <div className={styles.divActionsOrder}>
                      <Button text='Añadir' className='btnAdd' type='submit' />
                    </div>

                  </div>

                </fieldset>
              </form>

              {loading && <Loader />}
            </div>

            {/* DETALLE DEL PEDIDO */}
            <div className="module">
              <CardOrder
                orderDetails={orderDetails}
                currentOrder={currentOrder}
                handleConfirmOrder={handleConfirmOrder}
                handleDeleteProduct={handleDeleteProduct}
                handleCancelOrder={handleCancelOrder}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}