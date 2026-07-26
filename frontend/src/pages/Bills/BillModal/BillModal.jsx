import styles from "./BillModal.module.css";
import { useEffect, useState } from "react";
import { Input, InputSelect } from "../../../components/Input/Input";
import { PAYMENT_METHOD } from "../../../data/options";
import { Button } from "../../../components/Button/Button";

const TAX_RATE = 0.19;

export const BillModal = ({ order, onClose, onConfirm }) => {
  const [dni, setDni] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
      console.log(dni, paymentMethod)
  },[dni, paymentMethod])


  if (!order) return null;

  const subtotal = Number(order.total) || 0;
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(dni === "") {
      alert("Ingresa un número de dni")
      return
    }
    if(paymentMethod === "") {
      alert("Selecciona un método de pago")
      return
    }

    setSubmitting(true);
    try {
      await onConfirm({
        client_dni: dni.trim() || null,
        payment_method: paymentMethod,
      });
    } catch(err) {
      console.error(err)
    } finally {
      setDni("")
      setPaymentMethod("")
      setSubmitting(false);
    }
  };



  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={{color: "black"}}>Facturar orden #{order.id}</h2>
        <p className={styles.subtitle}>Mesa {order.table_number}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="DNI del cliente (opcional)"
            type="text"
            className="inputPrimary"
            placeholder="Dejar vacío si no aplica"
            name="name"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            variant = "light"
            required
          />

          <InputSelect
            label="Método de pago"
            className="inputPrimary"
            name="payment_method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            data={PAYMENT_METHOD.slice(1)}
            variant = "light"
          />

          <div className={styles.summary}>
            <div>
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div>
              <span>IVA (19%)</span>
              <span>${tax.toLocaleString()}</span>
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
              onClick={onClose}
              disabled={submitting}
            />
            <Button
              text={submitting ? "Generando..." : "Aceptar y facturar"}
              type="submit"
              disabled={submitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
