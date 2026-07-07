import styles from './CardOrder.module.css'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/Button/Button'

export const CardOrder = ({ 
  orderDetails = [],
  currentOrder,
  handleConfirmOrder,
  handleDeleteProduct,
  handleCancelOrder
 }) => {
  
  const { user } = useAuth()

  const safeDetails = orderDetails || [];

  const totalResumen =
    safeDetails?.reduce(
      (acc, product) => acc + (Number(product.price) * product.quantity),
      0
    )

  return (
    <div className={styles.cardOrder}>

      {/* ENCABEZADO */}
      <h2 className={styles.cardTitle}>
        {currentOrder
          ? `Mesa ${currentOrder.table_number ? currentOrder.table_number : "00" } - Pedido #${currentOrder.id ? currentOrder.id : "0000"}`
          : 'Pedido sin crear'}
      </h2>

      <div className={styles.state}>
        {currentOrder?.state || 'SIN PEDIDO'}
      </div>

      <label className={styles.labelCardItem}>Mesero: </label>
      <span className={styles.spanCardItem}>{user.name + " " + user.lastname}</span>
      <br />

      <label className={styles.labelCardItem}>Fecha: </label>
      <span className={styles.spanCardItem}> {
        currentOrder?.created_at ?
          new Date(currentOrder.created_at)
            .toLocaleDateString() : '---'}
      </span>

      {/* TABLA DE PRODUCTOS */}
      <table className={styles.tableOrder}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {safeDetails && safeDetails.length > 0
            ? (
              safeDetails.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${Number(product.price).toLocaleString()}</td>
                  <td>${(Number(product.price) * product.quantity).toLocaleString()}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash-can"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteProduct(product.product_id)}
                    />
                  </td>
                </tr>
              ))
            )
            : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  Sin productos agregados
                </td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td colSpan="1"><strong>$ {totalResumen.toLocaleString()}</strong></td>
          </tr>
        </tfoot>
      </table>

      {/* OBSERVACIONES: solo mostrar las que tengan descripción */}
      {safeDetails.some(p => p.description) && (
        <>
          <p>Observaciones</p>
          <ul className={styles.description}>
            {safeDetails
              .filter(p => p.description)
              .map((product) => (
                <li key={product.product_id}>
                  <strong>{product.name}:</strong> {product.notes}
                </li>
              ))}
          </ul>
        </>
      )}

      {/* ACCIONES */}
      <div className={styles.divActionsOrder}>
        <Button
          className={!currentOrder || safeDetails.length === 0 ? 'btnDisable' : 'btnDelete'}
          text='Eliminar pedido'
          onClick={handleCancelOrder}
          disabled={!currentOrder} />
        <Button
          className={!currentOrder || safeDetails.length === 0 ? 'btnDisable' : 'btnUpdate'}
          text="Enviar a cocina"
          onClick={handleConfirmOrder}
          disabled={!currentOrder || safeDetails.length === 0}
        />
      </div>

    </div>
  )
}