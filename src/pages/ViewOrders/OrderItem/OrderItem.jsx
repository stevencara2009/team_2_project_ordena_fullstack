import { useState } from 'react'
import styles from './OrderItem.module.css'

export const OrderItem = ({ orders }) => {

  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className={`${styles.orderItem} ${selectedOrder === order.id ? styles.orderOrange : styles.orderDark}`} onClick={() => setSelectedOrder(order.id)} >
          <h3 className={styles.cardTitle}>{`Mesa: ${order.table_id} - Pedido: ${order.id}`}</h3>
          <div className={styles.state}>{order.state}</div>
          <label className={styles.labelOrderItem}>Mesero: </label><span className={styles.spanOrderItem}>{order.user_id}</span>
          <br />
          <label className={styles.labelOrderItem}>Fecha: </label><span className={styles.spanOrderItem}>{order.created_at}</span>
          <br />
          <div className={styles.totalOrder}>
            <span className={styles.spanOrderItem}>Total ($): </span><span className={styles.spanOrderItem}>28.000</span>
          </div>

        </div>
      ))}
    </>
  )
}