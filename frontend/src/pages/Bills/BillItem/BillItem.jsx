import styles from './BillItem.module.css'
import { useState, useEffect } from 'react' // 1. Importar hooks
import { getStateColor } from '../../../utils/orderUtils'
import { Pagination } from '../../../components/Pagination/Pagination' // 2. Importar Pagination

export const BillItem = ({
  ordersFiltered = [],
  onCreateBill
}) => {
  // 3. Estado y configuración de paginación
  const [currentPage, setCurrentPage] = useState(1)
  const billsPerPage = 12

  // Resetear a página 1 cuando los filtros o las órdenes cambien
  useEffect(() => {
    setCurrentPage(1)
  }, [ordersFiltered.length])

  if (ordersFiltered.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        No hay órdenes entregadas pendientes de facturar.
      </p>
    )
  }

  // 4. Lógica de rebanado (slicing)
  const totalPages = Math.ceil(ordersFiltered.length / billsPerPage)
  const indexOfLastBill = currentPage * billsPerPage
  const indexOfFirstBill = indexOfLastBill - billsPerPage

  // Órdenes/Facturas correspondientes a la página actual
  const currentOrders = ordersFiltered.slice(
    indexOfFirstBill,
    indexOfLastBill
  )

  return (
    <div>
      <div className={styles.ordersContainer}>
        {currentOrders.map((order) => {
          return (
            <div
              key={order.id}
              className={`${styles.order} ${styles.orderDark}`}
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
                    Facturar
                  </div>
                )}
              </div>

              {/* Fila Inferior */}
              <div className={styles.footerRow}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalAmount}>
                  $ {order.total
                    ? Number(order.total).toLocaleString()
                    : 0}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 5. Controles de Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}