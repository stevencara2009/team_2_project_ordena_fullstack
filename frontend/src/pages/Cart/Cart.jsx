import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { createClientOrder } from "../../services/orderService";
import noPhoto from "../../assets/without_photo_product.jpg";
import styles from "./Cart.module.css";
import { Button } from "../../components/Button/Button";

export const Cart = () => {
  const { tableNumber, items, updateQuantity, removeItem, clearCart, total } =
    useCart();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!tableNumber) {
      setError(
        "No se detectó el número de mesa. Escanea el QR de tu mesa nuevamente.",
      );
      return;
    }

    try {
      setSending(true);
      setError("");
      await createClientOrder({
        table_number: Number(tableNumber),
        items: items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
          notes: i.notes ?? null,
        })),
      });
      clearCart();
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="background">
        <div className="container">
          <div className="container-form">
            <div className={styles.successState}>
              <h1>✅ ¡Pedido enviado!</h1>
              <p>El mesero lo confirmará en unos instantes.</p>
              <Link to="/menu" className={styles.secondaryButton}>
                Ver menú
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="background">
        <div className="container">
          <div className="container-form">
            <div className={styles.emptyState}>
              <h1>🛒 Tu carrito está vacío</h1>
              <Link to="/menu" className={styles.secondaryButton}>
                Ver menú
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1 className={styles.title}>
            Tu pedido
            {tableNumber && (
              <span className={styles.tableBadge}>Mesa {tableNumber}</span>
            )}
          </h1>

          <div className={styles.itemsList}>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className={styles.item}>
                <img
                  src={product.image || noPhoto}
                  alt={product.name}
                  className={styles.itemImg}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noPhoto;
                  }}
                />
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{product.name}</h4>
                  <p className={styles.itemPrice}>${product.price} COP</p>
                </div>
                <div className={styles.qtyControls}>
                  <button
                    className={styles.qtyButton}
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    −
                  </button>
                  <span className={styles.itemQuantity}>{quantity}</span>
                  <button
                    className={styles.qtyButton}
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <i
                  className="fa-solid fa-trash-can"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => removeItem(product.id)}
                />
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <span className={styles.itemTotal}>Total</span>
            <b className={styles.itemTotal}>${total} COP</b>
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <div className={styles.actions}>
            <Button
              text="Seguir pidiendo"
              className="btnBack"
              onClick={() => {
                navigate("/menu");
              }}
              disabled={sending}
            />

            <Button
              text={sending ? "Enviando..." : "Enviar pedido"}
              className="btnAdd"
              onClick={handleConfirm}
              disabled={sending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
