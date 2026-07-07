import styles from './OrderItem.module.css'
import { getNextState, getStateColor } from '../../../utils/orderUtils'

export const OrderItem = ({
  ordersFiltered,
  selectedOrder,
  setSelectedOrder,
  onUpdateState
}) => {

  return (
    <div className={styles.ordersContainer}>
      {ordersFiltered.map((order) => {

        const nextState = getNextState(order.state)
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

            {/* Fila Central: Info de control y estado */}
            <div className={styles.bodyRow}>
              <div className={styles.metaInfo}>
                <p><span>Mesero:</span> {order.user_name} {order.user_lastname}</p>
                <p><span>Items:</span> {order.total_items || 5} u.</p>
                <p className={styles.time}>{order.created_at}</p>
              </div>

              <div>
                <p>Estado Actual:</p>
                <div
                  className={styles.stateBadge}
                  style={{ backgroundColor: getStateColor(order.state) }}
                >
                  {order.state}
                </div>
              </div>

              {/* BOTÓN AVANZAR ESTADO — solo si hay siguiente */}
              {nextState && (
                <div
                  className={styles.btnNextState}
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdateState(order.id, nextState)
                  }}
                >
                  → {nextState}
                </div>
              )}

            </div>

            {/* Fila Inferior: Total */}
            <div className={styles.footerRow}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalAmount}>$ {order.total || '28,000'}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}