import styles from './OrderItem.module.css'

export const OrderItem = () => {
  return (
    <div className={styles.orderItem}>
      <h3 className={styles.cardTitle}>Mesa 1 - Pedido #1053</h3>
      <div className={styles.state}>Pendiente</div>
      <label className={styles.labelOrderItem}>Mesero: </label><span className={styles.spanOrderItem}>Maria Isabel Perez</span>
      <br />
      <label className={styles.labelOrderItem}>Fecha: </label><span className={styles.spanOrderItem}>10/06/2025</span>
      <br />
      <div className={styles.totalOrder}>
        <span className={styles.spanOrderItem}>Total ($): </span><span className={styles.spanOrderItem}>28.000</span>
      </div>

    </div>
  )
}