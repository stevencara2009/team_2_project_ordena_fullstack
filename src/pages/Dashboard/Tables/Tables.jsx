import { useEffect, useState } from 'react';
import styles from './Tables.module.css';
import { Input } from '../../../components/Input/Input';

export const Tables = () => {

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    fetch('/api/tables.json')
      .then(response => response.json())
      .then(result => {
        setTables(result)
      })
  })

  return (
    <div>
      <form action="" className="formFlex">

        <Input
          label="N° de mesa"
          type="number"
          className="inputPrimary"
          placeholder=""
          name=""
          value=""
          onChange={() => { }}
          required
          variant='dark'
        />

        <Input
          label="N° de pedido"
          type="number"
          className="inputPrimary"
          placeholder=""
          name=""
          value=""
          onChange={() => { }}
          required
          variant='dark'
        />

        <div className={styles.divSearch}>
          <button type='button' ><i className="fa-solid fa-magnifying-glass" style={{ width: 25, height: 25 }}></i></button>
        </div>

      </form>

      <div className={styles.gridTables}>
        {tables.map((table) => (
          <div 
            key={table.number}
            className={`${styles.tableItem} ${ selectedTable === table.number ? styles.classOrange : styles.classWhite }`}
            onClick={() => {setSelectedTable(table.number)
            } } >{table.number}</div>
        ))}
      </div>
    </div>
  )
}