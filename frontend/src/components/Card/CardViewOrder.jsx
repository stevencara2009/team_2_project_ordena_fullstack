import styles from './CardOrder.module.css'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { getOrderProducts } from '../../services/orderProductService'
import { getStateColor } from '../../utils/orderUtils'

export const CardOrder = ({
  currentOrder,
}) => {

  const { user } = useAuth()
  const [products, setProducts] = useState([])

  // Cargar los productos correspondientes a ESTA orden específica
  useEffect(() => {
    if (currentOrder?.id) {
      const fetchProducts = async () => {
        try {
          const data = await getOrderProducts(currentOrder.id)
          // Nos aseguramos de guardar siempre un array para evitar errores de .reduce() o .map()
          setProducts(Array.isArray(data) ? data : [])
        } catch (error) {
          console.error(`Error cargando productos de la orden ${currentOrder.id}:`, error)
          setProducts([])
        }
      }
      fetchProducts()
    }
  }, [currentOrder?.id])


  // Calcular el total de la orden de forma segura
  const totalResumen =
    products.reduce(
      (acc, product) => acc + (Number(product.price) * product.quantity),
      0
    )

  // Si por alguna razón no hay orden válida, no se renderiza nada
  if (!currentOrder) return null;


  return (
    <div className={styles.cardOrder}>

      {/* ENCABEZADO */}
      <h2 className={styles.cardTitle}>
        {`Mesa ${currentOrder.table_number || "00"} - Pedido #${currentOrder.id || "0000"}`}
      </h2>

      <div className={styles.stateBadge} style={{ backgroundColor: getStateColor(currentOrder.state) }}>
        {currentOrder.state || 'SIN ESTADO'}
      </div>

      <label className={styles.labelCardItem}>Mesero: </label>
      <span className={styles.spanCardItem}>
        {user?.name ? `${user.name} ${user.lastname || ''}` : 'No asignado'}
      </span>
      <br />

      <label className={styles.labelCardItem}>Fecha: </label>
      <span className={styles.spanCardItem}>
        {currentOrder.created_at
          ? new Date(currentOrder.created_at).toLocaleDateString()
          : '---'}
      </span>

      {/* TABLA DE PRODUCTOS */}
      <table className={styles.tableOrder}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.product_id || product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${Number(product.price).toLocaleString()}</td>
                <td>${(Number(product.price) * product.quantity).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                Sin productos agregados
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td colSpan="1"><strong>$ {totalResumen.toLocaleString()}</strong></td>
          </tr>
        </tfoot>
      </table>

      {/* OBSERVACIONES: Solo se muestra si al menos un producto tiene notas */}
      {products.some(p => p.notes || p.description) && (
        <>
          <p className={styles.observacionesTitle}>Observaciones</p>
          <ul className={styles.description}>
            {products
              .filter(p => p.notes || p.description)
              .map((product) => (
                <li key={product.product_id || product.id}>
                  <strong>{product.name}:</strong> {product.notes || product.description}
                </li>
              ))}
          </ul>
        </>
      )}

    </div>
  )
}