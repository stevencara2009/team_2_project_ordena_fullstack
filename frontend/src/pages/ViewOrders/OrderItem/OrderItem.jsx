import styles from "./OrderItem.module.css";
import {
  getNextState,
  getBeforeState,
  getStateColor,
} from "../../../utils/orderUtils";
import next_icon from "../../../assets/next-icon.png";
import before_icon from "../../../assets/before-icon.png";
import { Button } from "../../../components/Button/Button";

const customFormatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const OrderItem = ({
  ordersFiltered,
  selectedOrder,
  setSelectedOrder,
  onUpdateState,
}) => {
  return (
    <div className={styles.ordersContainer}>
      {ordersFiltered.map((order) => {
        const isPending = order.state === "POR CONFIRMAR";
        const nextState = getNextState(order.state);
        const beforeState = getBeforeState(order.state);
        const isSelected = selectedOrder?.id === order.id;

        return (
          <div
            key={order.id}
            className={`${styles.order} ${isSelected ? styles.orderOrange : styles.orderDark} ${isPending ? styles.orderPending : ""}`}
            onClick={() => setSelectedOrder(order)}
          >
            {/* Fila Superior: ID y Mesa */}
            <div className={styles.headerRow}>
              <h3 className={styles.orderId}>{`# ${order.id}`}</h3>
              <span
                className={styles.tableBadge}
              >{`Mesa: ${order.table_number}`}</span>
            </div>

            {isPending && (
              <div className="">
                <p className={styles.pendingTag}>🔔 Nuevo pedido del cliente</p>
                <Button
                  text="Confirmar"
                  className="btnAdd"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateState(order.id, "PENDIENTE");
                  }}
                />
              </div>
            )}

            {/* Fila Central */}
            <div className={styles.bodyRow}>
              <div className={styles.metaInfo1}>
                <p>
                  <span>Mesero:</span>{" "}
                  {order.user_name
                    ? `${order.user_name} ${order.user_lastname}`
                    : "Sin asignar"}
                </p>
                <p>
                  <span>Items:</span> {order.total_items || 5} u.
                </p>
                <p>
                  <span>Creado:</span> {customFormatDate(order.created_at)}
                </p>
              </div>

              <div className={styles.metaInfo2}>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "#888",
                  }}
                >
                  Estado:
                </p>

                <div className={styles.actions}>
                  {isPending ? (
                    <>
                      <div
                        className={styles.stateBadge}
                        style={{ backgroundColor: getStateColor(order.state) }}
                      >
                        {order.state}
                      </div>
                    </>
                  ) : (
                    <>
                      {beforeState && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateState(order.id, beforeState);
                          }}
                        >
                          <div className={styles.beforeIcon}>
                            <img src={before_icon} alt="before-icon" />
                          </div>
                        </div>
                      )}

                      <div
                        className={styles.stateBadge}
                        style={{ backgroundColor: getStateColor(order.state) }}
                      >
                        {order.state}
                      </div>

                      {nextState && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateState(order.id, nextState);
                          }}
                        >
                          <div className={styles.nextIcon}>
                            <img src={next_icon} alt="next-icon" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Fila Inferior: Total */}
            <div className={styles.footerRow}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalAmount}>$ {order.total || "0"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
