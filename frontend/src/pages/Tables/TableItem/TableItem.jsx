import styles from "../Tables.module.css";
import user_emoji from "../../../assets/user_emoji.png";
import editar_emoji from "../../../assets/editar_emoji.png";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";
import { TableQR } from "../../../components/TableQR/TableQR";

export const TableItem = ({
  tables,
  onSelectTable,
  setOpenModalUpdate,
  onShowQR,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("Acaá:", user);
  }, [onSelectTable]);

  return (
    <>
      {tables.map((table) => (
        <div
          key={table.number}
          className={`${styles.tableItem}  ${
            table.state === "LIBRE"
              ? styles.free
              : table.state === "OCUPADA"
                ? styles.busy
                : table.state === "RESERVADA"
                  ? styles.reserved
                  : styles.disabled
          }`}
          onClick={() => onSelectTable(table)}
        >
          <div
            className={styles.divEdit}
            onClick={() => setOpenModalUpdate(true)}
          >
            <h3>Mesa {table.number}</h3>
            <img src={editar_emoji} alt="editar_emoji" />
          </div>
          <div className={styles.divAforo}>
            <p className={styles.description}>Aforo máx: {table.capacity} </p>
            <img src={user_emoji} alt="user_emoji" />
          </div>
          <p className={styles.description}>{table.state}</p>

          {user?.role === "ADMINISTRADOR" && (
            <div style={{ display: "flex" }}>
              <button
                type="button"
                className={styles.qrButton}
                onClick={(e) => {
                  e.stopPropagation(); // evita que también se seleccione la mesa
                  onShowQR(table);
                }}
              >
                Ver QR
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
