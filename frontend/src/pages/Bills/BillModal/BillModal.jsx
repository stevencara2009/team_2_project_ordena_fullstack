import styles from "./BillModal.module.css";
import { useEffect, useState } from "react";
import { Input, InputSelect } from "../../../components/Input/Input";
import { PAYMENT_METHOD, PROPINA } from "../../../data/options";
import { Button } from "../../../components/Button/Button";

const TAX_RATE = 0.19;
const PROPINA_RATE = 0.1;

export const BillModal = ({ order, onClose, onConfirm }) => {
  const [dni, setDni] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [hasPropina, setHasPropina] = useState("NO");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log(dni, paymentMethod, hasPropina);
  }, [dni, paymentMethod, hasPropina]);

  if (!order) return null;

  const subtotal = Number(order.total) || 0;
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const propina = hasPropina === "SI" ? Number((subtotal * PROPINA_RATE).toFixed(2)) : 0;
  const total = Number((subtotal + propina).toFixed(2));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dni === "") {
      alert("Ingresa un número de dni");
      return;
    }
    if (paymentMethod === "") {
      alert("Selecciona un método de pago");
      return;
    }
    if (hasPropina === "") {
      alert("Selecciona si cliente da propina o no");
      return;
    }

    setSubmitting(true);
    try {
      await onConfirm({
        client_dni: dni.trim() || null,
        payment_method: paymentMethod,
        propina: hasPropina,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setDni("");
      setPaymentMethod("");
      setHasPropina("NO");
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: "black" }}>Facturar orden #{order.id}</h2>
        <p className={styles.subtitle}>Mesa {order.table_number}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="DNI del cliente"
            type="text"
            className="inputPrimary"
            placeholder="Dejar vacío si no aplica"
            name="name"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            variant="light"
            required
          />

          <InputSelect
            label="Método de pago"
            className="inputPrimary"
            name="payment_method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            data={PAYMENT_METHOD.slice(1)}
            variant="light"
          />

          <InputSelect
            label="Propina"
            className="inputPrimary"
            name="propina"
            value={hasPropina}
            onChange={(e) => setHasPropina(e.target.value)}
            data={PROPINA.slice(1)}
            variant="light"
          />

          <div className={styles.summary}>
            <div>
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div>
              <span style={{ fontSize: "10px" }}>IVA (19%)</span>
              <span style={{ fontSize: "10px" }}>${tax.toLocaleString()}</span>
            </div>
            <div>
              <span style={{ fontSize: "10px" }}>Propina (10%)</span>
              <span style={{ fontSize: "10px" }}>
                {" "}
                ${propina.toLocaleString()}
              </span>
            </div>
            <div className={styles.total}>
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              text="Cancelar"
              type="button"
              className="btnBack"
              onClick={onClose}
              disabled={submitting}
            />
            <Button
              text={submitting ? "Generando..." : "Aceptar y facturar"}
              type="submit"
              className="btnAdd"
              disabled={submitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
