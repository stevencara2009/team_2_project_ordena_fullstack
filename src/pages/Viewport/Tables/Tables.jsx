import { CardOrder } from '../CardOrder/CardOrder';
import styles from './Tables.module.css';

export const Tables = () => {
  return (
    <div>
      <form action="" className={styles.formFlex}>
        <label htmlFor="table-id">N° de mesa
          <input type="number" id="table-id" className={styles.inputTable} />
        </label>
        <label htmlFor="order-id">N° de pedido
          <input type="number" id="order-id" className={styles.inputTable} />
        </label>
        <div className={styles.divSearch}>
          <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
        </div>
      </form>

      <div className={styles.gridTables}>
        <div className={styles.tableItem}>1</div>
        <div className={styles.tableItem}>2</div>
        <div className={styles.tableItem}>3</div>
        <div className={styles.tableItem}>4</div>
        <div className={styles.tableItem}>5</div>
        <div className={styles.tableItem}>6</div>
        <div className={styles.tableItem}>7</div>
        <div className={styles.tableItem}>8</div>
        <div className={styles.tableItem}>9</div>
        <div className={styles.tableItem}>10</div>
        <div className={styles.tableItem}>11</div>
        <div className={styles.tableItem}>12</div>
        <div className={styles.tableItem}>13</div>
        <div className={styles.tableItem}>14</div>
        <div className={styles.tableItem}>15</div>
        <div className={styles.tableItem}>16</div>
        <div className={styles.tableItem}>17</div>
        <div className={styles.tableItem}>18</div>
        <div className={styles.tableItem}>19</div>
        <div className={styles.tableItem}>20</div>
      </div>
    </div>
  )
}