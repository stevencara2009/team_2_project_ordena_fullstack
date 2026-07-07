import styles from "../Tables.module.css"


export const TableItem = ({ tables, onSelectTable }) => {

  return (
    <>
      {tables.map((table) => (
        <div
          key={table.number}
          className={`${styles.tableItem}  ${table.state === "LIBRE"
            ? styles.free
            : table.state === "OCUPADA"
              ? styles.busy
              : styles.reserved
            }`}
          onClick={() => onSelectTable(table)}

        >
          <div className="">
            <h2>Mesa {table.number}</h2>
            <p>Capacidad: {table.capacity}</p>
            <p> Estado: {table.state}</p>
          </div>
        </div>
      ))}
    </>
  )
}