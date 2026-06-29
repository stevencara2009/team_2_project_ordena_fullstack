import styles from './BillDetail.module.css'

export const BillDetail = ({ billDetails }) => {

  if (!billDetails) return null

  const { bill, client, user, table, products } = billDetails

  return (
    <div className={styles.billCard}>

      <h2 className={styles.billTitle}>Factura #{bill.id}</h2>
      <p className={styles.billDate}>
        {new Date(bill.date).toLocaleString()}
      </p>

      <div className={styles.section}>
        <p><span>Mesa:</span> {table.number}</p>
        <p><span>Mesero:</span> {user.name} {user.lastname}</p>
        {client && (
          <p><span>Cliente:</span> {client.name} {client.lastname}</p>
        )}
      </div>

      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${Number(product.price).toLocaleString()}</td>
              <td>${Number(product.subtotal).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td><strong>${Number(bill.total).toLocaleString()}</strong></td>
          </tr>
        </tfoot>
      </table>

    </div>
  )
}