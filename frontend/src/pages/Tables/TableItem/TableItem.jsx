import styles from "../Tables.module.css"
import user_emoji from "../../../assets/user_emoji.png"
import editar_emoji from "../../../assets/editar_emoji.png"

export const TableItem = ({ tables, onSelectTable, setOpenModalUpdate }) => {

  return (
    <>
      {tables.map((table) => (
        <div
          key={table.number}
          className={`${styles.tableItem}  ${
            table.state === "LIBRE" ? styles.free
            : table.state === "OCUPADA" ? styles.busy
            : table.state === "RESERVADA" ? styles.reserved
            : styles.disabled
            }`}
          onClick={() => onSelectTable(table)}

        >

            <h3>Mesa {table.number}</h3>
            <div className={styles.divAforo}>
              <p className={styles.description}>Aforo máx: {table.capacity} </p>
              <img src={user_emoji} alt="user_emoji"/>
            </div>
            <p className={styles.description}>{table.state}</p>
            <div className={styles.divEdit} onClick={()=>setOpenModalUpdate(true)}>
              <img src={editar_emoji} alt="editar_emoji"/>
            </div>

        </div>
      ))}
    </>
  )
}