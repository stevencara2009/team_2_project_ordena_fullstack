import { useEffect, useState, useMemo } from "react";
import { BillDetail } from "../Bills/BillDetail/BillDetail";
import { useBills } from "../../hooks/useBills";
import { Input, InputSelect } from "../../components/Input/Input";
import { exportBillsToCsv } from "../../utils/exportCsv";
import { Button } from "../../components/Button/Button";
import styles from "./BillsHistory.module.css";
import { BillsTable } from "../../components/Table/BillsTable";

const PAYMENT_METHODS = ["Todos", "EFECTIVO", "TARJETA"];

export const BillsHistory = () => {
  const {
    bills,
    selectedBillDetails,
    loading,
    loadBills,
    loadBillDetails,
    clearSelectedBillDetails,
  } = useBills();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Todos");

  const fetchBills = async () => {
    await loadBills({
      from: from || undefined,
      to: to || undefined,
      payment_method: paymentMethod !== "Todos" ? paymentMethod : undefined,
    });
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchBills();
  };

  const totalFiltered = useMemo(
    () => bills.reduce((acc, b) => acc + Number(b.total), 0),
    [bills],
  );

  return (
    <div className="background">
      <div className="container">
        <div className="container-form">
          <h1>Historial de facturas</h1>

          <div className="container-flex">
            <div className="module">
              <form onSubmit={handleFilter}>
                <fieldset className="form-flex">
                  <legend>Filtro</legend>

                  <Input
                    label="Desde"
                    type="date"
                    className="inputPrimary"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    variant="dark"
                  />

                  <Input
                    label="Hasta"
                    type="date"
                    className="inputPrimary"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    variant="dark"
                  />

                  <InputSelect
                    label="Método usado"
                    className="inputPrimary"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    data={PAYMENT_METHODS}
                    variant="dark"
                  />

                  <Button
                    text="Filtrar"
                    type="submit"
                    className={styles.filterBtn}
                  />
                </fieldset>
              </form>

              <div className={styles.summaryBar}>
                <span>{bills.length} factura(s)</span>
                <span>Total: ${totalFiltered.toLocaleString()}</span>

                <Button
                  text="Exportar CSV"
                  type="button"
                  onClick={() => exportBillsToCsv(bills)}
                  disabled={!bills.length}
                  className={styles.exportBtn}
                />
              </div>

              {loading ? (
                <p>Cargando facturas...</p>
              ) : (
                <BillsTable
                  bills={bills}
                  onRowClick={(bill) => loadBillDetails(bill.id)}
                  emptyMessage="No hay facturas en el rango seleccionado."
                />
              )}
            </div>

            <div className="module">
              {selectedBillDetails ? (
                <>
                  <Button
                    text="Cerrar detalle"
                    className={styles.closeBtn}
                    onClick={clearSelectedBillDetails}
                  />

                  <BillDetail billDetails={selectedBillDetails} />
                </>
              ) : (
                <p>
                  <em>Selecciona una factura para ver su detalle aquí.</em>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
