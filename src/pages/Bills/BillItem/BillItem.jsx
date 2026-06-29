import styles from './BillItem.module.css'
import { getStateColor } from '../../../utils/orderUtils'

export const BillItem = ({
  ordersFiltered,
  selectedOrder,
  setSelectedOrder,
  onCreateBill
}) => {

  if (ordersFiltered.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        No hay órdenes entregadas pendientes de facturar.
      </p>
    )
  }


  return (
    <div className={styles.ordersContainer}>
      {ordersFiltered.map((order) => {
        const isSelected = selectedOrder?.id === order.id

        return (
          <div
            key={order.id}
            className={`${styles.order} ${isSelected ? styles.orderOrange : styles.orderDark}`}
            onClick={() => setSelectedOrder(order)}
          >
            {/* Fila Superior: ID y Mesa */}
            <div className={styles.headerRow}>
              <h3 className={styles.orderId}>{`# ${order.id}`}</h3>
              <span className={styles.tableBadge}>{`Mesa: ${order.table_number}`}</span>
            </div>

            {/* Fila Central */}
            <div className={styles.bodyRow}>
              <div className={styles.metaInfo}>
                <p><span>Mesero:</span> {order.user_name} {order.user_lastname}</p>
                <p className={styles.time}>
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <p>Estado:</p>
                <div
                  className={styles.stateBadge}
                  style={{ backgroundColor: getStateColor(order.state) }}
                >
                  {order.state}
                </div>
              </div>

              {order.state === "ENTREGADO" && (
                <div
                  className={styles.btnNextState}
                  onClick={(e) => {
                    e.stopPropagation()
                    onCreateBill(order)
                  }}
                >
                  Generar factura
                </div>
              )}
            </div>

            {/* Fila Inferior */}
            <div className={styles.footerRow}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalAmount}>
                $ {order.total
                  ? Number(order.total).toLocaleString()
                  : '---'}
              </span>
            </div>
          </div>
        )
      })}
    </div >
  )
}