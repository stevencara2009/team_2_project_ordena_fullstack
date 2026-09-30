import styles from "./BillsTable.module.css";

export const BillsTable = ({
  bills = [],
  onRowClick,
  onDownloadClick,
  emptyMessage = "No hay facturas.",
}) => {
  if (bills.length === 0) {
    return <p className={styles.emptyMessage}>{emptyMessage}</p>;
  }

  return (
    <table className={styles.billsTable}>
      <thead>
        <tr>
          <th>#</th>
          <th>Orden</th>
          <th>Fecha</th>
          <th>Mesa</th>
          <th>Mesero</th>
          <th>Total</th>
          <th>Pago</th>
          <th>Propina</th>
          <th>Descargar</th>
        </tr>
      </thead>
      <tbody>
        {bills.map((bill) => (
          <tr
            key={bill.id}
            className={styles.row}
            onClick={() => onRowClick?.(bill)}
          >
            <td>{bill.id}</td>
            <td>{bill.order_id}</td>
            <td>{new Date(bill.date).toLocaleDateString()}</td>
            <td>{bill.table_number}</td>
            <td>
              {bill.waiter_name} {bill.waiter_lastname}
            </td>
            <td>${Number(bill.total).toLocaleString()}</td>
            <td>{bill.payment_method}</td>
            <td>{bill.propina}</td>
            <td>
              <button
                type="button"
                className={styles.downloadBtn}
                onClick={(e) => {
                  e.stopPropagation(); // evita que también dispare onRowClick
                  onDownloadClick?.(bill);
                }}
              >
                ⬇️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
