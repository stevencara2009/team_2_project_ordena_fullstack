import styles from './CardOrder.module.css'
import { ButtonDelete, ButtonUpdate } from '../../../components/Button/Button'

export const CardOrder = () => {
  return (
    <div className={styles.cardOrder}>
      <h2 className={styles.cardTitle}>Mesa 1 - Pedido #1053</h2>
      <div className={styles.state}>Pendiente</div>

      <label className={styles.labelCardItem}>Mesero: </label><span className={styles.spanCardItem}>Maria Isabel Perez</span>
      <br />
      <label className={styles.labelCardItem}>Fecha: </label><span className={styles.spanCardItem}>10/06/2025</span>

      {/* Tabla Orden */}
      <table className={styles.tableOrder}>
        <thead>
          <tr>
            <th>Sopas</th>
            <th>Cant.</th>
            <th>Costo ($)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ajiaco Santafereño</td>
            <td>1</td>
            <td>12000</td>
            <td><i className="fa-solid fa-trash-can"></i></td>
          </tr>
          <tr>
            <td>Hamburguesa</td>
            <td>2</td>
            <td>30000</td>
            <td><i className="fa-solid fa-trash-can"></i></td>
          </tr>
          <tr>
            <td>Cerveza 1lt Brahma</td>
            <td>2</td>
            <td>8000</td>
            <td><i className="fa-solid fa-trash-can"></i></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td colSpan="2"><strong>50000</strong></td>
          </tr>
        </tfoot>
      </table>


      <label htmlFor="" className={styles.labelCardItem} >Observaciones
        <input type="text" className={styles.orderDescription} />
        <i className="fa-solid fa-trash-can"></i>
      </label>
      <div className={styles.divActionsOrder}>
        <ButtonDelete />
        <ButtonUpdate />
      </div>

    </div>
  )
}